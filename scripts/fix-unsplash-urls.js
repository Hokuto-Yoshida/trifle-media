/**
 * Unsplash ダウンロード URL を安定した CDN URL に変換するスクリプト
 * 実行: node scripts/fix-unsplash-urls.js
 *
 * 変換前: https://unsplash.com/photos/Yrxr3bsPdS0/download?force=true&w=1600
 * 変換後: https://images.unsplash.com/photo-HASH?w=1600&q=80&auto=format&fit=crop
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'posts');
const DELAY_MS = 150; // リクエスト間の遅延（レートリミット対策）
const CONCURRENCY = 5;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// リダイレクトを手動追跡して最終URLを取得
function getFinalUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects === 0) return resolve(url);

    const lib = url.startsWith('https') ? require('https') : require('http');
    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      res.resume(); // レスポンスボディは不要
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        getFinalUrl(next, maxRedirects - 1).then(resolve).catch(reject);
      } else {
        resolve(url);
      }
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

// CDN URL をクリーンアップ（ixlib等の不安定パラメータを除去）
function cleanCdnUrl(url) {
  try {
    const u = new URL(url);
    if (!u.hostname.includes('unsplash.com')) return url;
    // 保持するパラメータのみ残す
    const keep = new URLSearchParams();
    if (u.searchParams.get('w')) keep.set('w', u.searchParams.get('w'));
    keep.set('q', '80');
    keep.set('auto', 'format');
    keep.set('fit', 'crop');
    u.search = keep.toString();
    return u.toString();
  } catch {
    return url;
  }
}

function getMdxFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => path.join(dir, f));
}

// Unsplash ダウンロード URL のフォトIDを抽出
function extractPhotoId(url) {
  const m = url.match(/unsplash\.com\/photos\/([^/]+)\/download/);
  return m ? m[1] : null;
}

async function main() {
  const files = getMdxFiles(CONTENT_DIR);
  console.log(`📂 対象ファイル数: ${files.length}`);

  // フォトID → ファイルパスのマッピングを構築
  const photoToFiles = new Map(); // photoId -> [{ file, originalUrl }]
  const fileContents = new Map(); // file -> content

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    fileContents.set(file, content);

    const match = content.match(/thumb:\s*"(https:\/\/unsplash\.com\/photos\/[^"]+)"/);
    if (!match) continue;

    const url = match[1];
    const photoId = extractPhotoId(url);
    if (!photoId) continue;

    if (!photoToFiles.has(photoId)) {
      photoToFiles.set(photoId, { originalUrl: url, files: [] });
    }
    photoToFiles.get(photoId).files.push(file);
  }

  const uniqueIds = [...photoToFiles.keys()];
  console.log(`🔍 ユニークな Unsplash 写真ID: ${uniqueIds.length}件`);

  // バッチ処理でリダイレクトを追跡
  const urlMap = new Map(); // originalUrl -> cdnUrl
  let processed = 0;
  let failed = 0;

  for (let i = 0; i < uniqueIds.length; i += CONCURRENCY) {
    const batch = uniqueIds.slice(i, i + CONCURRENCY);

    await Promise.all(batch.map(async (photoId) => {
      const { originalUrl } = photoToFiles.get(photoId);
      try {
        const finalUrl = await getFinalUrl(originalUrl);
        if (finalUrl.includes('images.unsplash.com')) {
          urlMap.set(originalUrl, cleanCdnUrl(finalUrl));
          processed++;
        } else {
          console.warn(`  ⚠️  CDN URLに到達できず: ${photoId} → ${finalUrl}`);
          failed++;
        }
      } catch (e) {
        console.warn(`  ❌ エラー: ${photoId} - ${e.message}`);
        failed++;
      }
    }));

    const done = Math.min(i + CONCURRENCY, uniqueIds.length);
    process.stdout.write(`\r  進捗: ${done}/${uniqueIds.length} (失敗: ${failed})`);
    if (i + CONCURRENCY < uniqueIds.length) await sleep(DELAY_MS);
  }

  console.log(`\n✅ 解決済み: ${processed}件 / 失敗: ${failed}件`);

  if (urlMap.size === 0) {
    console.log('変換対象なし。終了します。');
    return;
  }

  // MDXファイルを更新
  let updatedFiles = 0;
  for (const [file, content] of fileContents) {
    let newContent = content;
    for (const [originalUrl, cdnUrl] of urlMap) {
      if (content.includes(originalUrl)) {
        newContent = newContent.replace(originalUrl, cdnUrl);
      }
    }
    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf8');
      updatedFiles++;
    }
  }

  console.log(`📝 更新ファイル数: ${updatedFiles}件`);
  console.log('完了！');
}

main().catch(console.error);

/**
 * タイトル・description・tags のフロントマターの「2025」→「2026」を一括更新し、
 * lastmod を今日の日付にセットする。本文は一切変更しない。
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'posts');
const TODAY = '2026-07-05';
const DRY_RUN = process.argv.includes('--dry-run');

function updateFrontmatter(raw) {
  // フロントマターの区切りを探す
  const match = raw.match(/^(---\n)([\s\S]*?)\n(---\n?)([\s\S]*)$/);
  if (!match) return null;

  const [, open, fm, close, body] = match;

  // タイトルに 2025 が含まれない場合はスキップ
  if (!/2025/.test(fm)) return null;

  let updatedFm = fm;

  // title: 行の 2025 → 2026
  updatedFm = updatedFm.replace(
    /^(title:\s*".*?)2025(.*?")/m,
    (_, before, after) => `${before}2026${after}`
  );

  // description: 行の 2025 → 2026
  updatedFm = updatedFm.replace(
    /^(description:\s*".*?)2025(.*?")/m,
    (_, before, after) => `${before}2026${after}`
  );

  // tags: 配列内の "2025年" → "2026年"（タグは年号付きが多い）
  updatedFm = updatedFm.replace(/("2025年")/g, '"2026年"');

  // lastmod を今日の日付に更新（既存なら上書き、なければ date の直後に追加）
  if (/^lastmod:/m.test(updatedFm)) {
    updatedFm = updatedFm.replace(/^lastmod:\s*.+$/m, `lastmod: "${TODAY}"`);
  } else {
    updatedFm = updatedFm.replace(/^(date:\s*.+)$/m, `$1\nlastmod: "${TODAY}"`);
  }

  // 変更がなければスキップ
  if (updatedFm === fm) return null;

  return open + updatedFm + close + body;
}

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
let updated = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const result = updateFrontmatter(raw);

  if (!result) {
    skipped++;
    continue;
  }

  if (DRY_RUN) {
    console.log(`[DRY RUN] would update: ${file}`);
  } else {
    fs.writeFileSync(filePath, result, 'utf-8');
    console.log(`✅ updated: ${file}`);
  }
  updated++;
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}完了: ${updated}件更新, ${skipped}件スキップ`);

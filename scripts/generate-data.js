/**
 * ビルド前に静的JSONデータを生成するスクリプト
 * 検索機能とサイドバーが output: 'export' 環境で動作するよう、
 * public/data/ 以下に必要なJSONを事前生成します。
 *
 * 使用方法: node scripts/generate-data.js
 * package.json の prebuild スクリプトから自動実行されます。
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'posts');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://torifure.com').replace(/\/$/, '');

const CATEGORY_SLUG_MAP = {
  '国内旅行': 'domestic',
  '海外旅行': 'international',
  'グルメ': 'gourmet',
  '宿泊': 'accommodation',
  '旅のコツ': 'tips',
  domestic: 'domestic',
  international: 'international',
  gourmet: 'gourmet',
  accommodation: 'accommodation',
  tips: 'tips',
};

function getCategorySlug(categoryName) {
  return CATEGORY_SLUG_MAP[categoryName] || 'domestic';
}

function getSlugFromFilename(filename) {
  return filename.replace(/\.mdx?$/, '');
}

function loadAllPosts() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn('content/posts ディレクトリが見つかりません');
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  const posts = [];

  for (const file of files) {
    try {
      const filePath = path.join(CONTENT_DIR, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(raw);

      if (data.draft) continue;

      const slug = data.slug || getSlugFromFilename(file);
      posts.push({
        slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        updatedDate: data.updatedDate || null,
        category: data.category || '',
        subcategory: data.subcategory || null,
        tags: Array.isArray(data.tags) ? data.tags : [],
        thumb: data.thumb || '',
        readingTime: data.readingTime || 5,
        author: data.author || null,
        featured: data.featured || false,
        url: `${SITE_URL}/posts/${slug}/`,
      });
    } catch (err) {
      console.warn(`スキップ: ${file} - ${err.message}`);
    }
  }

  // 新しい順にソート
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

function generateSearchIndex(posts) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outputPath = path.join(OUTPUT_DIR, 'posts.json');
  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 0), 'utf-8');
  console.log(`✅ 検索インデックス生成完了: ${posts.length}件 → public/data/posts.json`);
}

function generateSidebarData(posts) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const latestPosts = posts.slice(0, 5).map(p => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    thumb: p.thumb || '/images/default-thumb.jpg',
  }));

  const categoryOrder = ['国内旅行', '海外旅行', 'グルメ', '宿泊', '旅のコツ'];
  const categoryMap = {};
  posts.forEach(p => {
    const name = p.category;
    if (!categoryMap[name]) categoryMap[name] = 0;
    categoryMap[name]++;
  });

  const categories = categoryOrder
    .filter(name => categoryMap[name])
    .map(name => ({
      name,
      slug: getCategorySlug(name),
      count: categoryMap[name],
    }));

  const data = { latestPosts, categories };
  const outputPath = path.join(OUTPUT_DIR, 'sidebar.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 0), 'utf-8');
  console.log(`✅ サイドバーデータ生成完了 → public/data/sidebar.json`);
}

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRssFeed(posts) {
  const feedPosts = posts.slice(0, 50);
  const buildDate = new Date().toUTCString();
  const lastBuildDate = feedPosts.length > 0 ? new Date(feedPosts[0].date).toUTCString() : buildDate;

  const items = feedPosts.map(post => {
    const pubDate = new Date(post.date).toUTCString();
    const categories = post.tags.map(tag => `    <category>${escapeXml(tag)}</category>`).join('\n');
    return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${escapeXml(post.url)}</link>
    <guid isPermaLink="true">${escapeXml(post.url)}</guid>
    <description>${escapeXml(post.description)}</description>
    <pubDate>${pubDate}</pubDate>
    <category>${escapeXml(post.category)}</category>
${categories}
  </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>トリフレメディア</title>
    <link>${SITE_URL}/</link>
    <description>一人旅を楽しむための情報を発信する専門メディア</description>
    <language>ja</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/images/og-image.jpg</url>
      <title>トリフレメディア</title>
      <link>${SITE_URL}/</link>
    </image>
${items}
  </channel>
</rss>`;

  const outputPath = path.join(PUBLIC_DIR, 'feed.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`✅ RSS Feed生成完了: ${feedPosts.length}件 → public/feed.xml`);
}

// メイン処理
const posts = loadAllPosts();
generateSearchIndex(posts);
generateSidebarData(posts);
generateRssFeed(posts);
console.log('🎉 静的データ生成完了');

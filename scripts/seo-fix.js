/**
 * SEO Fix Script
 * 1. Fix duplicate posts (set draft, add canonical, add Netlify redirects)
 * 2. Add internal links to posts that have none
 * 3. Update stale lastmod dates
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');
const TODAY = '2026-04-18';

// ─── Helpers ───────────────────────────────────────────────────────────────

function readPost(filename) {
  const filePath = path.join(POSTS_DIR, filename);
  const rawContent = fs.readFileSync(filePath, 'utf8');
  // Normalize line endings to LF
  const content = rawContent.replace(/\r\n/g, '\n');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return null;
  const [, frontmatterRaw, body] = fmMatch;
  return { filename, filePath, frontmatterRaw, body, content, rawContent };
}

function parseFrontmatter(raw) {
  const get = (key) => {
    const m = raw.match(new RegExp(`^${key}:\\s*[\"']?(.+?)[\"']?\\s*$`, 'm'));
    return m ? m[1].trim() : '';
  };
  const getTags = () => {
    const m = raw.match(/^tags:\s*\[([^\]]*)\]/m);
    if (!m) return [];
    return m[1].split(',').map(t => t.trim().replace(/['"]/g, ''));
  };
  return {
    title: get('title'),
    date: get('date'),
    lastmod: get('lastmod'),
    category: get('category'),
    subcategory: get('subcategory'),
    tags: getTags(),
    draft: get('draft') === 'true',
  };
}

function getSlug(filename) {
  return filename.replace('.mdx', '');
}

function hasInternalLinks(body) {
  return /\[.+?\]\(\/posts\//.test(body);
}

// ─── Load all posts ─────────────────────────────────────────────────────────

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));
const allPosts = files.map(f => {
  const post = readPost(f);
  if (!post) return null;
  const meta = parseFrontmatter(post.frontmatterRaw);
  return { ...post, meta, slug: getSlug(f) };
}).filter(Boolean).filter(p => !p.meta.draft);

console.log(`Loaded ${allPosts.length} non-draft posts\n`);

// ─── STEP 1: Fix duplicate posts ────────────────────────────────────────────
// Mark older duplicate as draft=true and record redirect pairs

const DUPLICATES = [
  // [older/worse slug, newer/better slug]
  // Laos Luang Prabang - two nearly identical posts
  ['laos-luangprabang-solo-travel-2025', 'laos-luangprabang-solo-travel-3nights-4days-2025'],
  // Barcelona typo slug
  ['barcerona-solo-travel-2025', 'barcelona-winter-solo-travel-2025'],
  // Lisbon winter (older, Oct 2025) vs general (newer, Jan 2026)
  ['portugal-lisbon-solo-travel-winter-2025', 'lisbon-solo-travel-guide-2026'],
];

const redirects = [];

console.log('=== STEP 1: Fixing duplicate posts ===');
DUPLICATES.forEach(([oldSlug, newSlug]) => {
  const oldFile = oldSlug + '.mdx';
  const oldPath = path.join(POSTS_DIR, oldFile);
  if (!fs.existsSync(oldPath)) {
    console.log(`  SKIP (not found): ${oldSlug}`);
    return;
  }

  const post = readPost(oldFile);
  if (!post) return;

  // Set draft: true and add canonical
  let newFrontmatter = post.frontmatterRaw;

  // Add/update draft
  if (/^draft:/m.test(newFrontmatter)) {
    newFrontmatter = newFrontmatter.replace(/^draft:\s*.+$/m, 'draft: true');
  } else {
    newFrontmatter = newFrontmatter + '\ndraft: true';
  }

  // Add canonical if not present
  if (!/^canonical:/m.test(newFrontmatter)) {
    newFrontmatter = newFrontmatter + `\ncanonical: "/posts/${newSlug}/"`;
  }

  const newContent = `---\n${newFrontmatter}\n---\n${post.body}`;
  fs.writeFileSync(oldPath, newContent, 'utf8');
  console.log(`  ✓ Drafted: ${oldSlug} → ${newSlug}`);
  redirects.push({ from: `/posts/${oldSlug}/`, to: `/posts/${newSlug}/` });
});

// Update netlify.toml with redirects
const netlifyPath = path.join(__dirname, '..', 'netlify.toml');
let netlifyContent = fs.readFileSync(netlifyPath, 'utf8');
if (redirects.length > 0 && !netlifyContent.includes('# SEO redirects')) {
  const redirectBlock = redirects.map(r =>
    `\n[[redirects]]\n  from = "${r.from}"\n  to = "${r.to}"\n  status = 301\n  force = true`
  ).join('');
  netlifyContent = netlifyContent.trimEnd() + '\n\n# SEO redirects' + redirectBlock + '\n';
  fs.writeFileSync(netlifyPath, netlifyContent, 'utf8');
  console.log(`  ✓ Added ${redirects.length} redirects to netlify.toml\n`);
}

// ─── STEP 2: Internal links ─────────────────────────────────────────────────
// For each post without internal links, find 3-5 related posts and add section

console.log('=== STEP 2: Adding internal links ===');

// Rebuild post list after step 1 (exclude newly drafted)
const activePosts = allPosts.filter(p => {
  const draftedSlugs = DUPLICATES.map(d => d[0]);
  return !draftedSlugs.includes(p.slug);
});

function scoreRelevance(post, candidate) {
  if (post.slug === candidate.slug) return -1;
  let score = 0;

  // Same subcategory
  if (post.meta.subcategory && post.meta.subcategory === candidate.meta.subcategory) score += 4;

  // Matching tags
  const tagOverlap = post.meta.tags.filter(t => candidate.meta.tags.includes(t)).length;
  score += tagOverlap * 2;

  // Same category
  if (post.meta.category === candidate.meta.category) score += 1;

  // Destination keyword overlap in slug
  const postParts = new Set(post.slug.split('-').filter(p => p.length > 3));
  const candParts = candidate.slug.split('-').filter(p => p.length > 3);
  const slugOverlap = candParts.filter(p => postParts.has(p)).length;
  score += slugOverlap * 3;

  // Avoid same-exact-theme (too similar could be cannibalization)
  // Boost complementary content (female/male variants, packing, budget)
  const complementary = ['packing', 'budget', 'female', 'male', 'gourmet', 'safety'];
  const isComplement = complementary.some(k => candidate.slug.includes(k) && !post.slug.includes(k));
  if (isComplement && score > 2) score += 2;

  return score;
}

function getRelatedPosts(post, allActive, count = 4) {
  return allActive
    .map(c => ({ post: c, score: scoreRelevance(post, c) }))
    .filter(x => x.score > 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(x => x.post);
}

function buildRelatedSection(relatedPosts) {
  if (relatedPosts.length === 0) return '';
  const links = relatedPosts.map(p =>
    `- [${p.meta.title}](/posts/${p.slug}/)`
  ).join('\n');
  return `\n\n---\n\n## 関連記事\n\n${links}\n`;
}

let internalLinkCount = 0;
const postsWithoutLinks = activePosts.filter(p => !hasInternalLinks(p.body));
console.log(`  Posts without internal links: ${postsWithoutLinks.length}`);

postsWithoutLinks.forEach(post => {
  const related = getRelatedPosts(post, activePosts);
  if (related.length < 2) {
    console.log(`  SKIP (not enough related): ${post.slug}`);
    return;
  }

  const relatedSection = buildRelatedSection(related);
  const newContent = `---\n${post.frontmatterRaw}\n---\n${post.body.trimEnd()}${relatedSection}`;
  fs.writeFileSync(post.filePath, newContent, 'utf8');
  internalLinkCount++;
});

console.log(`  ✓ Added internal links to ${internalLinkCount} posts\n`);

// ─── STEP 3: Update stale lastmod ───────────────────────────────────────────
console.log('=== STEP 3: Updating stale lastmod ===');

// Posts modified on git (passed via args) or posts with no lastmod
// We'll update all posts that have NO lastmod set
let lastmodCount = 0;
activePosts.forEach(post => {
  if (post.meta.lastmod) return; // already has lastmod, skip
  const newFrontmatter = post.frontmatterRaw + `\nlastmod: "${TODAY}"`;
  // Re-read the current file (may have been modified by step 2)
  const currentContent = fs.readFileSync(post.filePath, 'utf8');
  const fmMatch = currentContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return;
  const [, currentFm, currentBody] = fmMatch;
  if (/^lastmod:/m.test(currentFm)) return; // already added somehow
  const updatedFm = currentFm + `\nlastmod: "${TODAY}"`;
  fs.writeFileSync(post.filePath, `---\n${updatedFm}\n---\n${currentBody}`, 'utf8');
  lastmodCount++;
});

console.log(`  ✓ Added lastmod to ${lastmodCount} posts\n`);

// ─── Summary ────────────────────────────────────────────────────────────────
console.log('=== DONE ===');
console.log(`  Duplicates drafted: ${redirects.length}`);
console.log(`  Internal links added: ${internalLinkCount}`);
console.log(`  lastmod updated: ${lastmodCount}`);

// Cleanup temp file
if (fs.existsSync('posts_meta.json')) fs.unlinkSync('posts_meta.json');

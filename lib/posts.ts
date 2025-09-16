import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMetadata } from '@/types/post';

const contentDirectory = path.join(process.cwd(), 'content');

// 複数のディレクトリから記事を取得する設定
const POST_DIRECTORIES = [
  'content/posts',                    // 既存のフラット構造
  'content/articles',                 // 新しいカテゴリ構造
];

// 拡張されたPostMetadata型
interface ExtendedPostMetadata extends PostMetadata {
  subcategory?: string;
  filePath?: string;
}

// 再帰的にMDXファイルを探す関数
function getAllMdxFiles(dir: string, baseDir: string = dir, fileList: { path: string; relativePath: string }[] = []): { path: string; relativePath: string }[] {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // サブディレクトリも再帰的に探索
      getAllMdxFiles(filePath, baseDir, fileList);
    } else if (file.endsWith('.mdx')) {
      const relativePath = path.relative(baseDir, filePath);
      fileList.push({ path: filePath, relativePath });
    }
  });
  
  return fileList;
}

// スラッグ生成（ディレクトリ構造を考慮）
function generateSlugFromPath(relativePath: string): string {
  const pathWithoutExt = relativePath.replace(/\.mdx$/, '');
  const pathParts = pathWithoutExt.split(path.sep);
  
  // ファイル名部分を取得
  const fileName = pathParts[pathParts.length - 1];
  
  // フラット構造の場合はファイル名のみ
  if (pathParts.length === 1) {
    return fileName;
  }
  
  // ディレクトリ構造がある場合は、意味のある部分のみ結合
  if (pathParts.length > 2) {
    return pathParts.slice(-2).join('-');
  }
  
  return pathParts.join('-');
}

export async function getAllPosts(): Promise<ExtendedPostMetadata[]> {
  try {
    const allFiles: { path: string; relativePath: string }[] = [];
    
    // 各ディレクトリから記事を取得
    POST_DIRECTORIES.forEach(dirPath => {
      const fullPath = path.join(process.cwd(), dirPath);
      const files = getAllMdxFiles(fullPath, fullPath);
      allFiles.push(...files);
    });

    const allPostsData: ExtendedPostMetadata[] = allFiles
      .map(({ path: filePath, relativePath }) => {
        try {
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(fileContents);

          // draft が true の記事は除外
          if (data.draft === true) {
            return null;
          }

          // スラッグを生成（フロントマターで指定されていればそれを優先）
          const slug = data.slug || generateSlugFromPath(relativePath);

          return {
            slug,
            title: data.title || '',
            description: data.description || '',
            date: data.date || new Date().toISOString(),
            category: data.category || '未分類',
            subcategory: data.subcategory || undefined,
            tags: data.tags || [],
            thumb: data.thumb || data.ogImage || '/images/default-thumb.jpg',
            readingTime: data.readingTime || 5,
            author: typeof data.author === 'string' ? { name: data.author } : (data.author || { name: 'トリフレ編集部' }),
            featured: data.featured || false,
            draft: data.draft || false,
            filePath: relativePath, // デバッグ用
          } as ExtendedPostMetadata;
        } catch (error) {
          console.error(`Error processing file ${filePath}:`, error);
          return null;
        }
      })
      .filter((post): post is ExtendedPostMetadata => {
        return post !== null && !!post.title && !post.draft;
      });

    return allPostsData.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const allFiles: { path: string; relativePath: string }[] = [];
    
    // 各ディレクトリから記事を取得
    POST_DIRECTORIES.forEach(dirPath => {
      const fullPath = path.join(process.cwd(), dirPath);
      const files = getAllMdxFiles(fullPath, fullPath);
      allFiles.push(...files);
    });

    // スラッグに一致するファイルを探す
    let targetFile: { path: string; data: any; content: string } | null = null;
    
    for (const { path: filePath, relativePath } of allFiles) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const fileSlug = data.slug || generateSlugFromPath(relativePath);
      if (fileSlug === slug) {
        targetFile = { path: filePath, data, content };
        break;
      }
    }

    if (!targetFile) {
      return null;
    }

    const { data, content } = targetFile;

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      content,
      date: data.date || new Date().toISOString(),
      category: data.category || '未分類',
      tags: data.tags || [],
      thumb: data.thumb || data.ogImage || '/images/default-thumb.jpg',
      readingTime: data.readingTime || 5,
      author: typeof data.author === 'string' ? { name: data.author } : (data.author || { name: 'トリフレ編集部' }),
      featured: data.featured || false,
      draft: data.draft || false,
      seo: data.seo || {},
      affiliate: data.affiliate || {},
    } as Post;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// カテゴリとサブカテゴリでの絞り込み
export async function getPostsByCategory(category: string, subcategory?: string): Promise<ExtendedPostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => {
    if (subcategory) {
      return post.category === category && post.subcategory === subcategory;
    }
    return post.category === category;
  });
}

export async function getPostsByTag(tag: string): Promise<ExtendedPostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

export async function getFeaturedPosts(): Promise<ExtendedPostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.featured);
}

export async function getLatestPosts(limit: number = 6): Promise<ExtendedPostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
}

export async function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): Promise<ExtendedPostMetadata[]> {
  const categoryPosts = await getPostsByCategory(category);
  return categoryPosts
    .filter(post => post.slug !== currentSlug)
    .slice(0, limit);
}

export async function searchPosts(query: string): Promise<ExtendedPostMetadata[]> {
  const allPosts = await getAllPosts();
  const lowercaseQuery = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.category.toLowerCase().includes(lowercaseQuery) ||
    (post.subcategory && post.subcategory.toLowerCase().includes(lowercaseQuery))
  );
}

export function generatePostSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.length / 2;
  return Math.ceil(wordCount / wordsPerMinute);
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tagSet = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

export async function getAllCategories(): Promise<{ category: string; subcategory?: string; count: number }[]> {
  const allPosts = await getAllPosts();
  const categoryMap = new Map<string, number>();
  
  allPosts.forEach(post => {
    const key = post.subcategory ? `${post.category}/${post.subcategory}` : post.category;
    categoryMap.set(key, (categoryMap.get(key) || 0) + 1);
  });
  
  return Array.from(categoryMap.entries()).map(([key, count]) => {
    const [category, subcategory] = key.split('/');
    return { category, subcategory, count };
  });
}

export async function getPostSitemap(): Promise<{ slug: string; date: string }[]> {
  const allPosts = await getAllPosts();
  return allPosts.map(post => ({
    slug: post.slug,
    date: post.date,
  }));
}
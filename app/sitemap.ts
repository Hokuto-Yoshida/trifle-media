import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tripfriend.netlify.app'; // 独自ドメイン取得後に変更

  // 静的ページ
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  // カテゴリページ
  const categoryPages = [
    'domestic',
    'international', 
    'gourmet',
    'accommodation',
    'safety',
    'tips'
  ].map(category => ({
    url: `${baseUrl}/categories/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 記事ページ
  let postPages: any[] = [];
  try {
    const posts = await getAllPosts();
    postPages = posts
      .filter((post: any) => !post.draft) // 下書きを除外
      .map((post: any) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
  } catch (error) {
    console.error('Error loading posts for sitemap:', error);
  }

  return [...staticPages, ...categoryPages, ...postPages];
}
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://torifure.com').replace(/\/$/, '');
  const withTrailingSlash = (pathname: string = '') => {
    if (!pathname) return `${baseUrl}/`;
    return `${baseUrl}${pathname}/`;
  };

  // 髱咏噪繝壹・繧ｸ
  const staticPages = [
    {
      url: withTrailingSlash(),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: withTrailingSlash('/posts'),
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: withTrailingSlash('/categories'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: withTrailingSlash('/sitemap'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: withTrailingSlash('/contact'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: withTrailingSlash('/privacy'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: withTrailingSlash('/terms'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: withTrailingSlash('/disclaimer'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: withTrailingSlash('/author'),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // カテゴリページ（lib/categories.ts から動的生成）
  const categoryPages = CATEGORIES.map(category => ({
    url: withTrailingSlash(`/categories/${category.slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: category.featured ? 0.8 : 0.7,
  }));

  // 記事ページ（featured記事は優先度を上げる）
  let postPages: any[] = [];
  try {
    const posts = await getAllPosts();
    postPages = posts
      .filter((post: any) => !post.draft)
      .map((post: any) => ({
        url: withTrailingSlash(`/posts/${post.slug}`),
        lastModified: post.updatedDate ? new Date(post.updatedDate) : new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: post.featured ? 0.8 : 0.6,
      }));
  } catch (error) {
    console.error('Error loading posts for sitemap:', error);
  }

  return [...staticPages, ...categoryPages, ...postPages];
}

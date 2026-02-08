import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://torifure.com'; // 迢ｬ閾ｪ繝峨Γ繧､繝ｳ蜿門ｾ怜ｾ後↓螟画峩

  // 髱咏噪繝壹・繧ｸ
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

  // 繧ｫ繝・ざ繝ｪ繝壹・繧ｸ
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

  // 險倅ｺ九・繝ｼ繧ｸ
  let postPages: any[] = [];
  try {
    const posts = await getAllPosts();
    postPages = posts
      .filter((post: any) => !post.draft) // 荳区嶌縺阪ｒ髯､螟・
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

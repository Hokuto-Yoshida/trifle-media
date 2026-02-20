import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

type SidebarPost = {
  slug: string;
  title: string;
  category: string;
  thumb: string;
};

type SidebarCategory = {
  name: string;
  slug: string;
  count: number;
};

export async function GET() {
  const allPosts = await getAllPosts();

  const latestPosts: SidebarPost[] = allPosts.slice(0, 5).map(toSidebarPost);

  const categoryMap = new Map<string, { count: number; slug: string }>();
  allPosts.forEach((post) => {
    const slug = getCategorySlug(post.category);
    const current = categoryMap.get(post.category);
    if (current) {
      current.count += 1;
    } else {
      categoryMap.set(post.category, { count: 1, slug });
    }
  });

  const order = ['国内旅行', '海外旅行', 'グルメ', '宿泊', '旅のコツ'] as const;
  const categories: SidebarCategory[] = order
    .map((name) => {
      const info = categoryMap.get(name);
      if (!info) return null;
      return { name, slug: info.slug, count: info.count };
    })
    .filter((v): v is SidebarCategory => v !== null);

  return NextResponse.json({ latestPosts, categories });
}

function toSidebarPost(post: any): SidebarPost {
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    thumb: post.thumb || '/images/default-thumb.jpg',
  };
}

function getCategorySlug(categoryName: string): string {
  const categoryMapping: Record<string, string> = {
    '国内旅行': 'domestic',
    '海外旅行': 'international',
    'グルメ': 'gourmet',
    '宿泊': 'accommodation',
    '安全・治安': 'safety',
    '旅のコツ': 'tips',
    domestic: 'domestic',
    international: 'international',
    gourmet: 'gourmet',
    accommodation: 'accommodation',
    safety: 'safety',
    tips: 'tips',
  };

  return categoryMapping[categoryName] || 'domestic';
}

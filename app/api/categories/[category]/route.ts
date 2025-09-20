import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

const categoryMapping: Record<string, string> = {
  'domestic': '国内旅行',
  'international': '海外旅行',
  'gourmet': 'グルメ',
  'accommodation': '宿泊',
  'safety': '安全・準備',
  'tips': '旅のコツ',
};

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const categorySlug = params.category;
    const categoryName = categoryMapping[categorySlug];

    if (!categoryName) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const allPosts = await getAllPosts();
    
    // 公開済み記事をフィルタリングしてカテゴリで絞り込み、日付順（新しい順）でソート
    const categoryPosts = allPosts
      .filter((post: any) => !post.draft && post.category === categoryName)
      .sort((a: any, b: any) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    // 必要な情報のみ返す
    const postsData = categoryPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      category: post.category,
      tags: post.tags || [],
      thumb: post.thumb,
      readingTime: post.readingTime,
      author: post.author,
      featured: post.featured
    }));
    
    return NextResponse.json(postsData);
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  try {
    const allPosts = await getAllPosts();
    
    // 公開記事のみフィルタリングして日付順（新しい順）でソート
    const publishedPosts = allPosts
      .filter(post => !post.draft)
      .sort((a: any, b: any) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    
    // 検索に必要な情報のみ返す（パフォーマンス向上）
    const searchableData = publishedPosts.map(post => ({
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
    
    return NextResponse.json(searchableData);
  } catch (error) {
    console.error('Error fetching posts for search:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
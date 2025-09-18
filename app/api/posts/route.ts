// app/api/posts/route.ts
import { getAllPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allPosts = await getAllPosts();
    
    // 公開記事のみフィルタリング
    const publishedPosts = allPosts.filter(post => !post.draft);
    
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
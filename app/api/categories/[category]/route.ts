import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

const categoryMapping: Record<string, string> = {
  'domestic': '国内旅行',
  'international': '海外旅行',
  'gourmet': 'グルメ',
  'accommodation': '宿泊',
  'tips': '旅のコツ',
};

// サブカテゴリマッピング
const subcategoryMapping: Record<string, Record<string, string>> = {
  'domestic': {
    'hokkaido-tohoku': '北海道・東北',
    'kanto': '関東',
    'chubu-hokuriku': '中部・北陸',
    'kansai': '関西',
    'chugoku-shikoku': '中国・四国',
    'kyushu-okinawa': '九州・沖縄',
  },
  'international': {
    'asia': 'アジア',
    'europe': 'ヨーロッパ',
    'americas': '北米・南米',
    'oceania': 'オセアニア',
    'middle-east-africa': '中東・アフリカ',
  },
  'gourmet': {
    'japanese': '和食',
    'western': '洋食',
    'asian': '中華・アジア料理',
    'cafe-sweets': 'カフェ・スイーツ',
  },
  'accommodation': {
    'hotel': 'ホテル',
    'ryokan': '旅館・民宿',
    'guesthouse': 'ゲストハウス',
    'glamping': 'グランピング・キャンプ',
  },
  'tips': {
    'safety': '安全・準備',
    'planning': '計画・予算',
    'packing': '持ち物・パッキング',
    'photography': '写真・SNS',
    'trouble': 'トラブル対処',
    'deals': 'お得情報',
  },
};

// 静的生成のためのパラメータを生成
export async function generateStaticParams() {
  return Object.keys(categoryMapping).map((category) => ({
    category,
  }));
}

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

    // URLからサブカテゴリパラメータを取得
    const { searchParams } = new URL(request.url);
    const subcategorySlug = searchParams.get('subcategory');

    const allPosts = await getAllPosts();
    
    // 公開済み記事をフィルタリング
    let categoryPosts = allPosts
      .filter((post: any) => !post.draft && post.category === categoryName);

    // サブカテゴリでフィルタリング（指定されている場合）
    if (subcategorySlug && subcategoryMapping[categorySlug]) {
      const subcategoryName = subcategoryMapping[categorySlug][subcategorySlug];
      if (subcategoryName) {
        categoryPosts = categoryPosts.filter((post: any) => 
          post.subcategory === subcategoryName
        );
      }
    }

    // 日付順（新しい順）でソート
    categoryPosts = categoryPosts.sort((a: any, b: any) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // 必要な情報のみ返す
    const postsData = categoryPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      category: post.category,
      subcategory: post.subcategory,
      tags: post.tags || [],
      thumb: post.thumb,
      readingTime: post.readingTime,
      author: post.author,
      featured: post.featured
    }));
    
    return NextResponse.json({
      category: categoryName,
      subcategory: subcategorySlug ? subcategoryMapping[categorySlug]?.[subcategorySlug] : null,
      posts: postsData,
      total: postsData.length
    });
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
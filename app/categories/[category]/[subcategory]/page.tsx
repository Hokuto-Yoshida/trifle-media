// app/categories/[category]/[subcategory]/page.tsx

import { ArrowRight, Home } from 'lucide-react';
import { Header, Footer } from '@/components';
import AdBanner from '@/components/AdBanner';
import CategoryPagination from '@/components/CategoryPagination';
import { getAllPosts } from '@/lib/posts';
import type { PostMetadata } from '@/types/post';

interface SubcategoryPageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

interface ExtendedPostMetadata extends PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  subcategory?: string;
  tags: string[];
  thumb: string;
  readingTime: number;
  author: any;
  featured: boolean;
  draft: boolean;
  filePath?: string;
}

const categories = {
  'domestic': { 
    name: '国内旅行', 
    description: '日本国内の一人旅スポットやおすすめ情報',
    subcategories: {
      'hokkaido-tohoku': '北海道・東北',
      'kanto': '関東',
      'chubu-hokuriku': '中部・北陸',
      'kansai': '関西',
      'chugoku-shikoku': '中国・四国',
      'kyushu-okinawa': '九州・沖縄',
    }
  },
  'international': { 
    name: '海外旅行', 
    description: '海外での一人旅のコツや注意点、おすすめの国',
    subcategories: {
      'asia': 'アジア',
      'europe': 'ヨーロッパ',
      'americas': '北米・南米',
      'oceania': 'オセアニア',
      'middle-east-africa': '中東・アフリカ',
    }
  },
  'gourmet': { 
    name: 'グルメ', 
    description: '一人旅で楽しむ美味しいグルメ情報',
    subcategories: {
      'japanese': '和食',
      'western': '洋食',
      'asian': '中華・アジア料理',
      'cafe-sweets': 'カフェ・スイーツ',
    }
  },
  'accommodation': { 
    name: '宿泊', 
    description: '一人旅におすすめの宿泊施設やホテル情報',
    subcategories: {
      'hotel': 'ホテル',
      'ryokan': '旅館・民宿',
      'guesthouse': 'ゲストハウス',
      'glamping': 'グランピング・キャンプ',
    }
  },
  'tips': { 
    name: '旅のコツ', 
    description: '一人旅をより楽しくするためのコツやアドバイス',
    subcategories: {
      'safety': '安全・準備',
      'planning': '計画・予算',
      'packing': '持ち物・パッキング',
      'photography': '写真・SNS',
      'trouble': 'トラブル対処',
      'deals': 'お得情報',
    }
  }
};

// 静的生成用の関数
export async function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = [];
  
  for (const [categorySlug, categoryData] of Object.entries(categories)) {
    if (categoryData.subcategories) {
      for (const subcategorySlug of Object.keys(categoryData.subcategories)) {
        params.push({ category: categorySlug, subcategory: subcategorySlug });
      }
    }
  }
  
  return params;
}

const subcategoryPageStyles = `
  /* Reset and base styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    line-height: 1.6;
    color: #333;
    background: white;
  }

  /* Main content */
  .main-content {
    background: white;
  }

  .content-layout {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    gap: 0;
  }

  .main-content-area {
    flex: 1;
    min-width: 0;
  }

  .container {
    max-width: none;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 1024px) {
    .content-layout {
      flex-direction: column;
    }
  }

  /* Webkit系ブラウザ（Chrome, Safari）用 */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #00d084;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #00a86b;
  }

  /* Firefox用 */
  html {
    scrollbar-width: thin;
    scrollbar-color: #00d084 #f1f1f1;
  }

  /* Breadcrumbs */
  .breadcrumbs {
    padding: 20px 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .breadcrumb-list {
    display: flex;
    align-items: center;
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 14px;
  }

  .breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .breadcrumb-link {
    color: #666;
    text-decoration: none;
    transition: color 0.2s;
  }

  .breadcrumb-link:hover {
    color: #00d084;
  }

  .breadcrumb-current {
    color: #333;
    font-weight: 500;
  }

  .breadcrumb-separator {
    color: #ccc;
  }

  /* Page header */
  .page-header {
    padding: 40px 0 20px 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .page-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 8px;
  }

  .page-description {
    color: #666;
    margin-bottom: 16px;
  }

  .post-count {
    color: #999;
    font-size: 14px;
  }

  /* Subcategory tabs */
  .subcategory-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e5e7eb;
  }

  .subcategory-tab {
    padding: 8px 16px;
    background: #f3f4f6;
    color: #666;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 20px;
    transition: all 0.2s;
  }

  .subcategory-tab:hover {
    background: #e5e7eb;
    color: #333;
  }

  .subcategory-tab.active {
    background: #00d084;
    color: white;
  }

  /* Posts section */
  .posts-section {
    padding: 40px 0;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }

  /* Related categories */
  .related-categories {
    padding: 40px 0;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
  }

  .related-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 24px;
  }

  .category-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .category-tag {
    padding: 8px 16px;
    background: #00d084;
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .category-tag:hover {
    background: #059669;
  }

  .empty-state {
    text-align: center;
    padding: 60px 0;
    color: #666;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .container {
      padding: 0 16px;
    }
    
    .posts-grid {
      grid-template-columns: 1fr;
    }
    
    .category-grid {
      justify-content: center;
    }
    
    .breadcrumb-list {
      flex-wrap: wrap;
    }
    
    .subcategory-tabs {
      gap: 6px;
    }
    
    .subcategory-tab {
      padding: 6px 12px;
      font-size: 13px;
    }
  }
`;

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = params;
  const categoryInfo = categories[categorySlug as keyof typeof categories];

  if (!categoryInfo || !categoryInfo.subcategories) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: subcategoryPageStyles }} />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <main className="main-content" style={{ flex: 1 }}>
            <div className="container">
              <div className="empty-state">
                <h1>カテゴリが見つかりません</h1>
                <p>指定されたカテゴリは存在しません。</p>
                <a href="/posts" style={{ color: '#00d084', textDecoration: 'underline' }}>
                  記事一覧に戻る
                </a>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const subcategoryName = categoryInfo.subcategories[subcategorySlug as keyof typeof categoryInfo.subcategories];
  
  if (!subcategoryName) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: subcategoryPageStyles }} />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <main className="main-content" style={{ flex: 1 }}>
            <div className="container">
              <div className="empty-state">
                <h1>サブカテゴリが見つかりません</h1>
                <p>指定されたサブカテゴリは存在しません。</p>
                <a href={`/categories/${categorySlug}`} style={{ color: '#00d084', textDecoration: 'underline' }}>
                  {categoryInfo.name}に戻る
                </a>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  let allPosts: ExtendedPostMetadata[] = [];
  try {
    allPosts = await getAllPosts() as ExtendedPostMetadata[];
  } catch (error) {
    console.error('Error loading posts:', error);
    allPosts = [];
  }

  const publishedPosts: ExtendedPostMetadata[] = allPosts.filter((post: ExtendedPostMetadata) => !post.draft);
  
  // カテゴリマッピング: URLスラッグ → 記事のカテゴリ名
  const categoryMapping: Record<string, string> = {
    'domestic': '国内旅行',
    'international': '海外旅行',
    'gourmet': 'グルメ',
    'accommodation': '宿泊',
    'tips': '旅のコツ',
  };

  // サブカテゴリマッピング: URLスラッグ → 記事のサブカテゴリ名
  const subcategoryMapping: Record<string, string> = {};
  Object.values(categories).forEach(cat => {
    if (cat.subcategories) {
      Object.assign(subcategoryMapping, cat.subcategories);
    }
  });

  // カテゴリとサブカテゴリでフィルタリングして日付順（新しい順）でソート
  const categoryName = categoryMapping[categorySlug];
  const subcategoryPosts: ExtendedPostMetadata[] = publishedPosts
    .filter((post: ExtendedPostMetadata) => 
      post.category === categoryName && 
      (Array.isArray(post.subcategory) 
        ? post.subcategory.includes(subcategoryName)
        : post.subcategory === subcategoryName)
    )
    .sort((a: ExtendedPostMetadata, b: ExtendedPostMetadata) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  // 同じカテゴリの他のサブカテゴリ
  const otherSubcategories = Object.entries(categoryInfo.subcategories)
    .filter(([slug]) => slug !== subcategorySlug)
    .map(([slug, name]) => ({ slug, name }));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: subcategoryPageStyles }} />
      
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <div className="content-layout">
          <main className="main-content-area" style={{ flex: 1 }}>
            {/* Breadcrumbs */}
            <section className="breadcrumbs">
              <div className="container">
                <nav>
                  <ol className="breadcrumb-list">
                    <li className="breadcrumb-item">
                      <a href="/" className="breadcrumb-link">
                        <Home size={14} />
                        ホーム
                      </a>
                    </li>
                    <li className="breadcrumb-separator">
                      <ArrowRight size={14} />
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/posts" className="breadcrumb-link">記事一覧</a>
                    </li>
                    <li className="breadcrumb-separator">
                      <ArrowRight size={14} />
                    </li>
                    <li className="breadcrumb-item">
                      <a href={`/categories/${categorySlug}`} className="breadcrumb-link">
                        {categoryInfo.name}
                      </a>
                    </li>
                    <li className="breadcrumb-separator">
                      <ArrowRight size={14} />
                    </li>
                    <li className="breadcrumb-item">
                      <span className="breadcrumb-current">{subcategoryName}</span>
                    </li>
                  </ol>
                </nav>
              </div>
            </section>

            {/* Page Header */}
            <section className="page-header">
              <div className="container">
                <h1 className="page-title">{subcategoryName}</h1>
                <p className="page-description">{categoryInfo.name}の{subcategoryName}に関する記事</p>
                <p className="post-count">{subcategoryPosts.length}件の記事があります</p>

                {/* Subcategory tabs */}
                <div className="subcategory-tabs">
                  <a 
                    href={`/categories/${categorySlug}`} 
                    className="subcategory-tab"
                  >
                    すべて
                  </a>
                  {Object.entries(categoryInfo.subcategories).map(([subSlug, subName]) => (
                    <a 
                      key={subSlug}
                      href={`/categories/${categorySlug}/${subSlug}`} 
                      className={`subcategory-tab ${subSlug === subcategorySlug ? 'active' : ''}`}
                    >
                      {subName}
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* Posts Section with Pagination */}
            <section className="posts-section">
              <div className="container">
                {subcategoryPosts.length > 0 ? (
                  <CategoryPagination 
                    posts={subcategoryPosts}
                    categorySlug={`${categorySlug}/${subcategorySlug}`}
                    postsPerPage={14}
                  />
                ) : (
                  <div className="empty-state">
                    <p>このサブカテゴリの記事はまだありません。</p>
                    <a href={`/categories/${categorySlug}`} style={{ color: '#00d084', textDecoration: 'underline' }}>
                      {categoryInfo.name}の他の記事を見る
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Related Subcategories Section */}
            {otherSubcategories.length > 0 && (
              <section className="related-categories">
                <div className="container">
                  <h2 className="related-title">{categoryInfo.name}の他のサブカテゴリ</h2>
                  <div className="category-grid">
                    {otherSubcategories.map((sub) => (
                      <a 
                        key={sub.slug} 
                        href={`/categories/${categorySlug}/${sub.slug}`} 
                        className="category-tag"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </main>
          
          <AdBanner />
        </div>
        
        <Footer />
      </div>
    </>
  );
}

// メタデータの生成
export async function generateMetadata({ params }: SubcategoryPageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = params;
  const categoryInfo = categories[categorySlug as keyof typeof categories];
  
  if (!categoryInfo || !categoryInfo.subcategories) {
    return {};
  }
  
  const subcategoryName = categoryInfo.subcategories[subcategorySlug as keyof typeof categoryInfo.subcategories];
  
  if (!subcategoryName) {
    return {};
  }
  
  return {
    title: `${subcategoryName} | ${categoryInfo.name} | トリフレメディア`,
    description: `${categoryInfo.name}の${subcategoryName}に関する記事一覧。一人旅の計画に役立つ情報をお届けします。`,
  };
}
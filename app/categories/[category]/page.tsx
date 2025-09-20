import { ArrowRight, Home } from 'lucide-react';
import { Header, Footer } from '@/components';
import AdBanner from '@/components/AdBanner';
import CategoryPagination from '@/components/CategoryPagination';
import { getAllPosts } from '@/lib/posts';
import type { PostMetadata } from '@/types/post';

interface CategoryPageProps {
  params: {
    category: string;
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
  'domestic': { name: '国内旅行', description: '日本国内の一人旅スポットやおすすめ情報' },
  'international': { name: '海外旅行', description: '海外での一人旅のコツや注意点、おすすめの国' },
  'gourmet': { name: 'グルメ', description: '一人旅で楽しむ美味しいグルメ情報' },
  'accommodation': { name: '宿泊', description: '一人旅におすすめの宿泊施設やホテル情報' },
  'safety': { name: '安全・準備', description: '一人旅の安全対策と事前準備のポイント' },
  'tips': { name: '旅のコツ', description: '一人旅をより楽しくするためのコツやアドバイス' }
};

// 静的生成用の関数
export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category: category,
  }));
}

const categoryPageStyles = `
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

  /* Article cards */
  .article-card {
    background: white;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    transition: all 0.2s ease;
    text-decoration: none;
    color: inherit;
  }

  .article-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .article-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    background: #f3f4f6;
  }

  .article-content {
    padding: 16px;
  }

  .article-category {
    display: inline-block;
    background: #00d084;
    color: white;
    padding: 3px 8px;
    font-size: 11px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .article-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    line-height: 1.4;
    color: #333;
  }

  .article-excerpt {
    color: #666;
    font-size: 13px;
    line-height: 1.4;
    margin-bottom: 8px;
  }

  .article-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: #999;
    margin-bottom: 12px;
  }

  /* Read more button */
  .read-more-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: #00d084;
    color: white;
    text-decoration: none;
    font-size: 12px;
    font-weight: 500;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .read-more-button:hover {
    background: #059669;
    transform: translateY(-1px);
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
  }
`;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category;
  const categoryInfo = categories[categorySlug as keyof typeof categories];

  if (!categoryInfo) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: categoryPageStyles }} />
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
    'safety': '安全・準備',
    'tips': '旅のコツ',
  };

  // カテゴリでフィルタリングして日付順（新しい順）でソート
  const categoryName = categoryMapping[categorySlug];
  const categoryPosts: ExtendedPostMetadata[] = publishedPosts
    .filter((post: ExtendedPostMetadata) => post.category === categoryName)
    .sort((a: ExtendedPostMetadata, b: ExtendedPostMetadata) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const otherCategories = Object.entries(categories)
    .filter(([slug]) => slug !== categorySlug)
    .map(([slug, info]) => ({ slug, name: info.name }));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: categoryPageStyles }} />
      
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
                      <span className="breadcrumb-current">{categoryInfo.name}</span>
                    </li>
                  </ol>
                </nav>
              </div>
            </section>

            {/* Page Header */}
            <section className="page-header">
              <div className="container">
                <h1 className="page-title">{categoryInfo.name}</h1>
                <p className="page-description">{categoryInfo.description}</p>
                <p className="post-count">{categoryPosts.length}件の記事があります</p>
              </div>
            </section>

            {/* Posts Section with Pagination */}
            <section className="posts-section">
              <div className="container">
                {categoryPosts.length > 0 ? (
                  <CategoryPagination 
                    posts={categoryPosts}
                    categorySlug={categorySlug}
                    postsPerPage={14}
                  />
                ) : (
                  <div className="empty-state">
                    <p>このカテゴリの記事はまだありません。</p>
                    <a href="/posts" style={{ color: '#00d084', textDecoration: 'underline' }}>
                      他の記事を見る
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Related Categories Section */}
            <section className="related-categories">
              <div className="container">
                <h2 className="related-title">他のカテゴリ</h2>
                <div className="category-grid">
                  {otherCategories.map((category) => (
                    <a key={category.slug} href={`/categories/${category.slug}`} className="category-tag">
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </main>
          
          <AdBanner />
        </div>
        
        <Footer />
      </div>
    </>
  );
}
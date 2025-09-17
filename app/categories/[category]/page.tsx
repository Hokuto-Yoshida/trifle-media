import { Metadata } from 'next';
import { ArrowRight, Home } from 'lucide-react';
import { Header, Footer, PostCard } from '@/components';
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
  draft: boolean;  // undefined を削除
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

// 静的生成用の関数を追加
export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category: category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryInfo = categories[params.category as keyof typeof categories];
  
  if (!categoryInfo) {
    return {
      title: 'カテゴリが見つかりません | トリフレメディア',
      description: '指定されたカテゴリは存在しません。',
    };
  }

  return {
    title: `${categoryInfo.name}の記事一覧 | トリフレメディア`,
    description: `${categoryInfo.description}に関する記事一覧です。`,
  };
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

  /* Header - exactly like SingaLife */
  .header-wrapper {
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  /* Top header - white background */
  .header-top {
    background: white;
    border-bottom: 1px solid #e5e7eb;
  }

  .header-top-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
  }

  .header-logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-text {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    text-decoration: none;
  }

  .logo-subtitle {
    font-size: 0.85rem;
    color: #666;
    font-weight: 400;
  }

  .header-top-nav {
    display: flex;
    list-style: none;
    gap: 40px;
    margin: 0;
    padding: 0;
  }

  .header-top-nav a {
    color: #333;
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    transition: color 0.2s;
  }

  .header-top-nav a:hover {
    color: #00d084;
  }

  /* Bottom header - green background */
  .nav-header {
    background: #00d084;
    color: white;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    position: relative;
    min-height: 50px;
  }

  .nav-menu {
    display: flex;
    list-style: none;
    gap: 0;
    margin: 0;
    padding: 0;
  }

  .nav-item {
    position: relative;
  }

  .nav-link {
    display: block;
    padding: 15px 32px;
    color: white;
    text-decoration: none;
    font-weight: 400;
    font-size: 14px;
    transition: background-color 0.2s;
    white-space: nowrap;
  }

  .nav-link:hover {
    background-color: rgba(255,255,255,0.1);
  }

  .nav-link.active {
    background-color: rgba(255,255,255,0.2);
  }

  /* Mobile menu */
  .mobile-menu-button {
    display: none;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 8px;
    position: absolute;
    left: 20px;
  }

  .mobile-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #00d084;
    border-top: 1px solid rgba(255,255,255,0.1);
    z-index: 1000;
  }

  .mobile-menu.active {
    display: block;
  }

  .mobile-menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .mobile-menu-item {
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .mobile-menu-link {
    display: block;
    padding: 16px 20px;
    color: white;
    text-decoration: none;
    font-weight: 400;
  }

  .mobile-menu-link:hover {
    background-color: rgba(255,255,255,0.1);
  }

  /* Main content */
  .main-content {
    background: white;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
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

  /* Pagination - like SingaLife */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 40px;
  }

  .pagination-button {
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    background: white;
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.2s;
    cursor: pointer;
  }

  .pagination-button:hover {
    background-color: #f9fafb;
  }

  .pagination-button.active {
    background: #00d084;
    color: white;
    border-color: #00d084;
  }

  .pagination-next {
    padding: 12px 24px;
    border: 1px solid #00d084;
    background: white;
    color: #00d084;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .pagination-next:hover {
    background: #00d084;
    color: white;
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
  @media (max-width: 968px) {
    .header-top-nav {
      display: none;
    }
    
    .nav-menu {
      display: none;
    }
    
    .mobile-menu-button {
      display: block;
    }
  }

  @media (max-width: 640px) {
    .header-top-container {
      padding: 12px 16px;
    }
    
    .nav-container {
      padding: 0 16px;
    }
    
    .container {
      padding: 0 16px;
    }
    
    .logo-text {
      font-size: 1.5rem;
    }
    
    .posts-grid {
      grid-template-columns: 1fr;
    }
    
    .pagination {
      flex-wrap: wrap;
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

  // カテゴリでフィルタリング
  const categoryName = categoryMapping[categorySlug];
  const categoryPosts: ExtendedPostMetadata[] = publishedPosts.filter((post: ExtendedPostMetadata) => 
    post.category === categoryName
  );
  
  const sortedPosts: ExtendedPostMetadata[] = categoryPosts.sort((a: ExtendedPostMetadata, b: ExtendedPostMetadata) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const otherCategories = Object.entries(categories)
    .filter(([slug]) => slug !== categorySlug)
    .map(([slug, info]) => ({ slug, name: info.name }));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: categoryPageStyles }} />
      
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Header />

        <main className="main-content" style={{ flex: 1 }}>
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
              <p className="post-count">{sortedPosts.length}件の記事があります</p>
            </div>
          </section>

          {/* Posts Section */}
          <section className="posts-section">
            <div className="container">
              {sortedPosts.length > 0 ? (
                <>
                  <div className="posts-grid">
                    {sortedPosts.map((post: ExtendedPostMetadata) => (
                      <article key={post.slug} className="article-card">
                        <img 
                          src={post.thumb || '/placeholder-image.jpg'} 
                          alt={post.title}
                          className="article-image"
                        />
                        <div className="article-content">
                          <span className="article-category">{post.category}</span>
                          <h3 className="article-title">{post.title}</h3>
                          <p className="article-excerpt">{post.description}</p>
                          <div className="article-meta">
                            <span>{new Date(post.date).toLocaleDateString('ja-JP')}</span>
                            <span>{post.readingTime}分</span>
                          </div>
                          <a href={`/posts/${post.slug}`} className="read-more-button">
                            この記事を見る
                            <ArrowRight size={14} />
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Pagination - SingaLife style */}
                  {sortedPosts.length > 12 && (
                    <div className="pagination">
                      <a href="#" className="pagination-button active">1</a>
                      <a href="#" className="pagination-button">2</a>
                      <a href="#" className="pagination-button">3</a>
                      <a href="#" className="pagination-next">
                        次のページへ
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  )}
                </>
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
        
        <Footer />
      </div>

      {/* Mobile menu JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const menuButton = document.getElementById('mobile-menu-toggle');
            const menu = document.getElementById('mobile-menu');
            
            if (menuButton && menu) {
              menuButton.addEventListener('click', function() {
                if (menu.classList.contains('active')) {
                  menu.classList.remove('active');
                  menuButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
                } else {
                  menu.classList.add('active');
                  menuButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                }
              });

              document.addEventListener('click', function(event) {
                const container = document.querySelector('.nav-container');
                
                if (container && !container.contains(event.target) && menu.classList.contains('active')) {
                  menu.classList.remove('active');
                  menuButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
                }
              });
            }
          });
        `
      }} />
    </>
  );
}
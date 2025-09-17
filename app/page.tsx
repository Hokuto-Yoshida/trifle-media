import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/components';
import { getAllPosts } from '@/lib/posts';

// 拡張されたPostMetadata型を定義
interface ExtendedPostMetadata {
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

export const metadata: Metadata = {
  title: 'トリフレメディア - Z世代のための一人旅特化メディア',
  description: 'Z世代のための一人旅特化メディア「トリフレ」。初めての一人旅から海外ビギナー向けまで、安心・安全な旅の情報をお届けします。',
  openGraph: {
    title: 'トリフレメディア - Z世代のための一人旅特化メディア',
    description: 'Z世代のための一人旅特化メディア「トリフレ」。初めての一人旅から海外ビギナー向けまで、安心・安全な旅の情報をお届けします。',
  },
};

const styles = `
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

  /* Hero Background Fixed Section */
  .hero-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #00d084 0%, #4ECDC4 100%);
    z-index: -1;
  }

  .hero-background::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
  }

  .hero-content {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 20px;
    color: white;
  }

  .hero-main-title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 700;
    margin-bottom: 24px;
    line-height: 1.2;
    text-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }

  .hero-subtitle {
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    font-weight: 500;
    margin-bottom: 16px;
    opacity: 0.95;
    line-height: 1.4;
  }

  .hero-app-subtitle {
    font-size: clamp(1rem, 2vw, 1.2rem);
    font-weight: 400;
    margin-bottom: 40px;
    opacity: 0.9;
  }

  .hero-app-buttons {
    display: flex;
    gap: 16px;
    margin-bottom: 60px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .app-store-button {
    background: rgba(255,255,255,0.2);
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 500;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.3);
    transition: all 0.3s ease;
    font-size: 16px;
  }

  .app-store-button:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
  }

  .scroll-indicator {
    background: rgba(255,255,255,0.2);
    color: white;
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 500;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.3);
    transition: all 0.3s ease;
    animation: bounce 2s infinite;
  }

  .scroll-indicator:hover {
    background: rgba(255,255,255,0.3);
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-5px); }
    60% { transform: translateY(-3px); }
  }

  /* Scrollable Content */
  .content-wrapper {
    position: relative;
    z-index: 1;
    margin-top: 100vh;
    background: white;
    border-radius: 24px 24px 0 0;
    box-shadow: 0 -8px 32px rgba(0,0,0,0.1);
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

  .section {
    padding: 40px 0;
  }

  .section-border {
    border-bottom: 1px solid #e5e7eb;
  }

  /* Section headers - exactly like SingaLife */
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 3px solid #00d084;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    margin: 0;
  }

  .section-link {
    color: #00d084;
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
  }

  .section-link:hover {
    text-decoration: underline;
  }

  /* Category tabs - like SingaLife */
  .category-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 24px;
    border-bottom: 1px solid #e5e7eb;
  }

  .category-tab {
    padding: 12px 20px;
    background: #f8f9fa;
    color: #666;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #e5e7eb;
    border-bottom: none;
    margin-right: 2px;
  }

  .category-tab:hover,
  .category-tab.active {
    background: #00d084;
    color: white;
    border-color: #00d084;
  }

  /* Article grids */
  .article-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 24px;
  }

  .large-article-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  /* Article cards - simplified like SingaLife */
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

  .empty-state {
    text-align: center;
    padding: 60px 0;
    color: #666;
  }

  /* Responsive */
  @media (max-width: 968px) {
    .large-article-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .container {
      padding: 0 16px;
    }
    
    .category-tabs {
      flex-wrap: wrap;
    }
    
    .article-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default async function HomePage() {
  // 投稿データの取得
  let allPosts: ExtendedPostMetadata[] = [];
  try {
    allPosts = await getAllPosts() as ExtendedPostMetadata[];
  } catch (error) {
    console.error('❌ Error loading posts:', error);
    allPosts = [];
  }

  const publishedPosts: ExtendedPostMetadata[] = allPosts.filter((post: ExtendedPostMetadata) => !post.draft);
  const sortedPosts: ExtendedPostMetadata[] = publishedPosts.sort((a: ExtendedPostMetadata, b: ExtendedPostMetadata) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // 新着記事（最新6件）
  const latestPosts: ExtendedPostMetadata[] = sortedPosts.slice(0, 6);

  // カテゴリ定義
  const categories = [
    { name: '国内旅行', slug: 'domestic' },
    { name: '海外旅行', slug: 'international' },
    { name: 'グルメ', slug: 'gourmet' },
    { name: '宿泊', slug: 'accommodation' },
    { name: '安全・準備', slug: 'safety' },
    { name: '旅のコツ', slug: 'tips' }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Fixed Background Hero */}
        <div className="hero-background">
          <div className="hero-content">
            <h1 className="hero-main-title">一人旅に、もう一人の仲間を。</h1>
            <p className="hero-subtitle">感情を分かち合い、コストも分け合える。</p>
            <p className="hero-app-subtitle">一人旅専用マッチングアプリ</p>
            
            <div className="hero-app-buttons">
              <a href="#" className="app-store-button">
                App Store
              </a>
              <a href="#" className="app-store-button">
                Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="content-wrapper" id="content">
          {/* Header */}
          <Header />

          <main className="main-content" style={{ flex: 1 }}>
            {/* ①最新記事セクション */}
            <section className="section section-border">
              <div className="container">
                <div className="section-header">
                  <h2 className="section-title">最新記事</h2>
                  <a href="/posts" className="section-link">
                    一覧を見る
                    <ArrowRight size={14} />
                  </a>
                </div>

                <div className="category-tabs">
                  <a href="/posts" className="category-tab active">新着</a>
                  <a href="/categories/domestic" className="category-tab">国内旅行</a>
                  <a href="/categories/international" className="category-tab">海外旅行</a>
                  <a href="/categories/gourmet" className="category-tab">グルメ</a>
                  <a href="/categories/accommodation" className="category-tab">宿泊</a>
                  <a href="/categories/safety" className="category-tab">安全・準備</a>
                  <a href="/categories/tips" className="category-tab">旅のコツ</a>
                </div>

                {latestPosts.length > 0 ? (
                  <>
                    <div className="large-article-grid">
                      {latestPosts.slice(0, 2).map((post: ExtendedPostMetadata) => (
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
                              <span>{post.readingTime}分で読める</span>
                            </div>
                            <a href={`/posts/${post.slug}`} className="read-more-button">
                              この記事を見る
                              <ArrowRight size={14} />
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>

                    {latestPosts.length > 2 && (
                      <div className="article-grid">
                        {latestPosts.slice(2, 8).map((post: ExtendedPostMetadata) => (
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
                    )}
                  </>
                ) : (
                  <div className="empty-state">
                    <p>記事を準備中です。しばらくお待ちください。</p>
                  </div>
                )}
              </div>
            </section>

            {/* ②〜⑦各カテゴリセクション */}
            {categories.map((category) => {
              const categoryPosts = publishedPosts.filter(post => 
                post.category === category.name || 
                post.tags.some(tag => tag.includes(category.name)) ||
                (category.slug === 'domestic' && (post.category.includes('国内') || post.tags.some(tag => tag.includes('国内')))) ||
                (category.slug === 'international' && (post.category.includes('海外') || post.tags.some(tag => tag.includes('海外')))) ||
                (category.slug === 'gourmet' && (post.category.includes('グルメ') || post.tags.some(tag => tag.includes('グルメ')))) ||
                (category.slug === 'accommodation' && (post.category.includes('宿泊') || post.tags.some(tag => tag.includes('宿泊')))) ||
                (category.slug === 'safety' && (post.category.includes('安全') || post.category.includes('準備') || post.tags.some(tag => tag.includes('安全') || tag.includes('準備')))) ||
                (category.slug === 'tips' && (post.category.includes('コツ') || post.tags.some(tag => tag.includes('コツ'))))
              );
              
              if (categoryPosts.length === 0) return null;
              
              return (
                <section key={category.slug} className="section section-border">
                  <div className="container">
                    <div className="section-header">
                      <h2 className="section-title">{category.name}</h2>
                      <a href={`/categories/${category.slug}`} className="section-link">
                        一覧を見る
                        <ArrowRight size={14} />
                      </a>
                    </div>

                    <div className="large-article-grid">
                      {categoryPosts.slice(0, 2).map((post: ExtendedPostMetadata) => (
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
                  </div>
                </section>
              );
            })}
          </main>
          
          <Footer />
        </div>
      </div>
    </>
  );
}
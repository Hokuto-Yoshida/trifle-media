import React from 'react';
import { ArrowRight, Heart, Users, Shield } from 'lucide-react';
import { Header, Footer } from '@/components';
import AdBanner from '@/components/AdBanner';
import { getAllPosts } from '@/lib/posts';
import HeroSliderClient from './HeroSliderClient';

// PostMetadata型定義
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
    height: calc(100vh - 120px);
    background: #3BC78f;
    z-index: -1;
    overflow: hidden;
  }


  .hero-content {
    position: relative;
    height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px 20px 100px 20px;
    color: white;
  }

  /* Hero Slider Container */
  .hero-slider {
    width: 100%;
    max-width: 1200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .hero-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-in-out;
  }

  .hero-slide.active {
    opacity: 1;
    transform: translateY(0);
  }

  /* Feature slides layout */
  .feature-slide {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    max-width: 1000px;
    width: 100%;
  }

  .feature-slide-mobile {
    display: none;
  }

  .feature-content {
    text-align: left;
  }

  .feature-icon {
    width: 48px;
    height: 48px;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    backdrop-filter: none
    flex-shrink: 0;
  }

  .feature-title {
    font-size: clamp(1.5rem, 4vw, 2.2rem);
    font-weight: 700;
    margin-bottom: 16px;
    line-height: 1.2;
  }

  .feature-description {
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    line-height: 1.6;
    opacity: 0.9;
    margin-bottom: 24px;
  }

  .feature-screenshot {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* スクリーンショット画像 */
  .screenshot-container {
    width: 240px;
    height: auto;
    position: relative;
    filter: none
  }

  .screenshot-image {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Main title slide */
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

  /* Slide indicators */
  .slide-indicators {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    z-index: 10;
  }

  .slide-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .slide-indicator.active {
    background: white;
    transform: scale(1.2);
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
    backdrop-filter: none
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
    margin-top: calc(100vh - 200px);
    background: white;
    border-radius: 24px 24px 0 0;
    box-shadow: 0 -8px 32px rgba(0,0,0,0.1);
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

  .section {
    padding: 40px 0;
  }

  .section-border {
    border-bottom: 1px solid #e5e7eb;
  }

  /* Section headers */
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

  /* Category tabs */
  .category-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 24px;
    border-bottom: 1px solid #e5e7eb;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
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
    white-space: nowrap;
    flex-shrink: 0;
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
    
    .feature-slide {
      display: none;
    }
    
    .feature-slide-mobile {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      align-items: center;
      max-width: 700px;
      width: 100%;
    }
    
    .feature-content {
      text-align: left;
    }
    
    .screenshot-container {
      width: 180px;
    }
    
    .hero-content {
      padding: 20px 20px 80px 20px;
    }
  }

  @media (max-width: 640px) {
    .container {
      padding: 0 16px;
    }
    
    .category-tabs {
      flex-wrap: nowrap;
    }
    
    .article-grid {
      grid-template-columns: 1fr;
    }
    
    .feature-slide-mobile {
      gap: 20px;
      max-width: 500px;
    }
    
    .screenshot-container {
      width: 150px;
    }
    
    .feature-icon {
      width: 36px;
      height: 36px;
      margin-bottom: 12px;
    }
    
    .feature-title {
      font-size: clamp(1.1rem, 5vw, 1.6rem);
      margin-bottom: 12px;
    }
    
    .feature-description {
      font-size: clamp(0.8rem, 3vw, 0.95rem);
      margin-bottom: 16px;
    }
    
    .hero-content {
      padding: 20px 16px 80px 16px;
    }
    
    .slide-indicators {
      bottom: 80px;
      gap: 8px;
    }
    
    .slide-indicator {
      width: 8px;
      height: 8px;
    }
  }

  @media (max-width: 480px) {
    .feature-slide-mobile {
      gap: 16px;
      max-width: 420px;
    }
    
    .screenshot-container {
      width: 130px;
    }
    
    .hero-content {
      padding: 20px 12px 70px 12px;
    }
    
    .slide-indicators {
      bottom: 60px;
    }
    
    .feature-title {
      font-size: clamp(1rem, 5vw, 1.4rem);
    }
    
    .feature-description {
      font-size: clamp(0.75rem, 3vw, 0.9rem);
    }
  }

  @media (max-width: 360px) {
    .screenshot-container {
      width: 110px;
    }
    
    .hero-content {
      padding: 20px 8px 60px 8px;
    }
    
    .slide-indicators {
      bottom: 50px;
      gap: 6px;
    }
    
    .slide-indicator {
      width: 6px;
      height: 6px;
    }
  }
`;

// HeroSliderコンポーネント
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const slides = [
    {
      id: 'main',
      content: (
        <>
          <h1 className="hero-main-title">一人旅に、もう一人の仲間を。</h1>
          <p className="hero-subtitle">感情を分かち合い、コストも分け合える。</p>
          <p className="hero-app-subtitle">一人旅専用マッチングアプリ</p>
        </>
      )
    },
    {
      id: 'swipe',
      content: (
        <div className="feature-slide">
          <div className="feature-content">
            <div className="feature-icon">
              <Heart size={28} color="white" />
            </div>
            <h2 className="feature-title">直感的なスワイプで<br />理想の旅仲間を発見</h2>
            <p className="feature-description">
              スワイプするだけで、同じ目的地や興味を持つ旅仲間を見つけられます。運命の出会いが、旅をさらに楽しく！
            </p>
          </div>
          <div className="feature-screenshot">
            <div className="screenshot-container">
              <img 
                src="/images/app-screenshots/swipe-screen.png" 
                alt="スワイプ画面"
                className="screenshot-image"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'plan',
      content: (
        <div className="feature-slide">
          <div className="feature-content">
            <div className="feature-icon">
              <Users size={28} color="white" />
            </div>
            <h2 className="feature-title">詳細な旅行プランを<br />簡単に作成・共有</h2>
            <p className="feature-description">
              「一緒に行く理由」「割り勘情報」「時間帯」まで細かく設定可能。お互いのニーズに合った仲間と、最高の瞬間を共有しましょう。
            </p>
          </div>
          <div className="feature-screenshot">
            <div className="screenshot-container">
              <img 
                src="/images/app-screenshots/travel-list.png" 
                alt="旅の仲間画面"
                className="screenshot-image"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'chat',
      content: (
        <div className="feature-slide">
          <div className="feature-content">
            <div className="feature-icon">
              <Shield size={28} color="white" />
            </div>
            <h2 className="feature-title">安心・安全な<br />メッセージ機能</h2>
            <p className="feature-description">
              「仲間募集中」「定員達成」など、募集状況が明確に表示。本人確認機能と通報システムで、安心して使える体験を提供します。
            </p>
          </div>
          <div className="feature-screenshot">
            <div className="screenshot-container">
              <img 
                src="/images/app-screenshots/chat-screen.png" 
                alt="チャット画面"
                className="screenshot-image"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'download',
      content: (
        <>
          <h2 className="hero-main-title">今すぐダウンロード</h2>
          <p className="hero-subtitle">一人旅をもっと楽しく、もっと安全に。</p>
        </>
      )
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          {slide.content}
        </div>
      ))}
      
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`slide-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default async function HomePage() {
  // サーバーサイドでデータを取得
  let allPosts: ExtendedPostMetadata[] = [];
  try {
    allPosts = await getAllPosts() as ExtendedPostMetadata[];
  } catch (error) {
    console.error('❌ Error loading posts:', error);
    allPosts = [];
  }

  const publishedPosts = allPosts.filter(post => !post.draft);
  const sortedPosts = publishedPosts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const latestPosts = sortedPosts.slice(0, 6);

  // カテゴリ定義
  const categories = [
    { name: '国内旅行', slug: 'domestic' },
    { name: '海外旅行', slug: 'international' },
    { name: 'グルメ', slug: 'gourmet' },
    { name: '宿泊', slug: 'accommodation' },
    { name: '旅のコツ', slug: 'tips' }
  ];

  if (!allPosts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Fixed Background Hero */}
        <div className="hero-background">
          <div className="hero-content">
            <HeroSliderClient />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="content-wrapper" id="content">
          <Header />

          <div className="content-layout">
            <main className="main-content-area" style={{ flex: 1 }}>
              {/* 最新記事セクション */}
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
                  <a href="/categories/tips" className="category-tab">旅のコツ</a>
                </div>

                {latestPosts.length > 0 ? (
                  <>
                    <div className="large-article-grid">
                      {latestPosts.slice(0, 2).map((post) => (
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
                        {latestPosts.slice(2, 8).map((post) => (
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

            {/* カテゴリセクション */}
            {categories.map((category) => {
              const categoryMapping: Record<string, string> = {
                'domestic': '国内旅行',
                'international': '海外旅行', 
                'gourmet': 'グルメ',
                'accommodation': '宿泊',
                'tips': '旅のコツ',
              };

              const categoryName = categoryMapping[category.slug];
              const categoryPosts = publishedPosts.filter(post => post.category === categoryName);
              
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
                      {categoryPosts.slice(0, 2).map((post) => (
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
          
          <AdBanner />
        </div>
          
        <Footer />
        </div>
      </div>
    </>
  );
}
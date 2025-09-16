import { Metadata } from 'next';
import { Search } from 'lucide-react';
import { Header, Footer, PostCard, CategoryGrid, CTAApp } from '@/components';
import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import type { Category } from '@/types/category';

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
  draft?: boolean;
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
  .hero-container {
    position: relative;
    background: linear-gradient(135deg, #eff6ff 0%, #dbfefaff 100%);
    padding: 80px 0;
  }
  
  .container {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 24px;
    line-height: 1.2;
    text-align: center;
  }
  
  .hero-title-primary {
    color: #10b981;
  }
  
  .hero-description {
    font-size: 1.25rem;
    color: #6b7280;
    margin: 0 auto 32px;
    max-width: 768px;
    line-height: 1.6;
    text-align: center;
  }
  
  .hero-actions {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
    margin-bottom: 48px;
  }
  
  @media (min-width: 640px) {
    .hero-actions {
      flex-direction: row;
    }
  }
  
  .search-container {
    position: relative;
    flex: 1;
    max-width: 400px;
    width: 100%;
  }
  
  .search-input {
    width: 100%;
    padding: 12px 16px 12px 48px;
    border-radius: 12px;
    border: 1px solid #d1d5db;
    background-color: white;
    color: #1f2937;
    font-size: 16px;
    outline: none;
    transition: all 0.2s;
  }
  
  .search-input:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    width: 20px;
    height: 20px;
  }
  
  .primary-button {
    padding: 12px 32px;
    background-color: #10b981;
    color: white;
    font-weight: 600;
    border-radius: 12px;
    text-decoration: none;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    display: inline-block;
  }
  
  .primary-button:hover {
    background-color: #059669;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
  
  .section {
    padding: 64px 0;
  }
  
  .section-white {
    background-color: white;
  }
  
  .section-gray {
    background-color: #f9fafb;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 48px;
  }
  
  .section-title {
    font-size: 1.875rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 16px;
  }
  
  .section-description {
    color: #6b7280;
  }
  
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    margin-bottom: 32px;
  }
  
  .grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 32px;
  }
  
  .secondary-button {
    display: inline-flex;
    align-items: center;
    padding: 12px 24px;
    border: 1px solid #10b981;
    color: #10b981;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s;
  }
  
  .secondary-button:hover {
    background-color: #10b981;
    color: white;
  }
  
  .text-center {
    text-align: center;
  }
  
  .empty-state {
    text-align: center;
    padding: 48px 0;
    color: #9ca3af;
  }
  
  .flex-column {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .arrow-icon {
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }
  
  .debug-info {
    background: #fee2e2;
    border: 1px solid #fca5a5;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    font-family: monospace;
    font-size: 14px;
  }
  
  .debug-title {
    font-weight: bold;
    color: #dc2626;
    margin-bottom: 8px;
  }
`;

export default async function HomePage() {
  // デバッグ情報を収集
  let debugInfo = {
    postsLoaded: 0,
    error: null as string | null,
    postTitles: [] as string[],
    publishedCount: 0,
    draftCount: 0,
  };

  // 投稿データの取得（型をExtendedPostMetadataに変更）
  let allPosts: ExtendedPostMetadata[] = [];
  try {
    console.log('🔍 getAllPosts() を実行中...');
    allPosts = await getAllPosts() as ExtendedPostMetadata[];
    
    debugInfo.postsLoaded = allPosts.length;
    debugInfo.postTitles = allPosts.map(post => post.title);
    debugInfo.publishedCount = allPosts.filter(post => !post.draft).length;
    debugInfo.draftCount = allPosts.filter(post => post.draft).length;
    
    console.log('✅ 取得した記事数:', allPosts.length);
    console.log('📝 記事タイトル:', allPosts.map(p => p.title));
  } catch (error) {
    console.error('❌ Error loading posts:', error);
    debugInfo.error = error instanceof Error ? error.message : 'Unknown error';
    allPosts = [];
  }

  const publishedPosts: ExtendedPostMetadata[] = allPosts.filter((post: ExtendedPostMetadata) => !post.draft);
  const sortedPosts: ExtendedPostMetadata[] = publishedPosts.sort((a: ExtendedPostMetadata, b: ExtendedPostMetadata) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // 新着記事（最新6件）
  const latestPosts: ExtendedPostMetadata[] = sortedPosts.slice(0, 6);

  // 人気記事（フィーチャーされた記事または最新から選択）
  const featuredPosts: ExtendedPostMetadata[] = publishedPosts.filter((post: ExtendedPostMetadata) => post.featured);
  const popularPosts: ExtendedPostMetadata[] = featuredPosts.length >= 3 ? featuredPosts.slice(0, 3) : sortedPosts.slice(0, 3);

  // カテゴリ別記事数の計算
  const categoryStats: Record<string, number> = publishedPosts.reduce((acc: Record<string, number>, post: ExtendedPostMetadata) => {
    const category: string = post.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // カテゴリにカウントを更新
  const categoriesWithCount: Category[] = CATEGORIES.map((category: Category) => ({
    ...category,
    count: categoryStats[category.name] || 0,
  }));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        
        <main style={{ flex: 1 }}>
          {/* Hero Section */}
          <section className="hero-container">
            <div className="container">
              <div>
                <h1 className="hero-title">
                  <span style={{ display: 'block' }}>あなたの</span>
                  <span className="hero-title-primary">一人旅</span>
                  <span style={{ display: 'block' }}>始めませんか？</span>
                </h1>
                
                <p className="hero-description">
                  Z世代のための一人旅特化メディア「トリフレ」。<br />
                  初めての一人旅から海外ビギナー向けまで、安心・安全な旅の情報をお届けします。
                </p>
              </div>
            </div>
          </section>
          
          {/* Latest Posts Section */}
          <section className="section section-white">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">📝 最新記事</h2>
                <p className="section-description">
                  新しく追加された一人旅情報をチェック
                </p>
              </div>
              
              {latestPosts.length > 0 ? (
                <>
                  <div className="grid-3">
                    {latestPosts.slice(0, 3).map((post: ExtendedPostMetadata) => (
                      <PostCard
                        key={post.slug}
                        slug={post.slug}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                        category={post.category}
                        tags={post.tags}
                        thumb={post.thumb}
                        readingTime={post.readingTime}
                        author={post.author}
                      />
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <a href="/posts" className="secondary-button">
                      すべての記事を見る
                      <svg className="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <p>記事を準備中です。しばらくお待ちください。</p>
                  <p>content/posts/ ディレクトリに .mdx ファイルがあることを確認してください。</p>
                </div>
              )}
            </div>
          </section>
          
          {/* Popular Posts Section */}
          {popularPosts.length > 0 && (
            <section className="section section-gray">
              <div className="container">
                <div className="section-header">
                  <h2 className="section-title">🔥 人気記事</h2>
                  <p className="section-description">
                    多くの人に読まれている注目の記事
                  </p>
                </div>
                
                <div className="grid-2">
                  <PostCard
                    slug={popularPosts[0].slug}
                    title={popularPosts[0].title}
                    description={popularPosts[0].description}
                    date={popularPosts[0].date}
                    category={popularPosts[0].category}
                    tags={popularPosts[0].tags}
                    thumb={popularPosts[0].thumb}
                    readingTime={popularPosts[0].readingTime}
                    author={popularPosts[0].author}
                    size="large"
                  />
                  
                  {popularPosts.length > 1 && (
                    <div className="flex-column">
                      {popularPosts.slice(1, 3).map((post: ExtendedPostMetadata) => (
                        <PostCard
                          key={post.slug}
                          slug={post.slug}
                          title={post.title}
                          description={post.description}
                          date={post.date}
                          category={post.category}
                          tags={post.tags}
                          thumb={post.thumb}
                          readingTime={post.readingTime}
                          author={post.author}
                          size="small"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
          
          {/* Categories Section */}
          <section className="section section-white">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">🗂️ カテゴリから探す</h2>
                <p className="section-description">
                  あなたの興味に合った記事を見つけよう
                </p>
              </div>
              
              <CategoryGrid categories={categoriesWithCount} />
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
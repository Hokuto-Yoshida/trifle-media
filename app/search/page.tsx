'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Search as SearchIcon } from 'lucide-react';
import { Header, Footer } from '@/components';
import AdBanner from '@/components/AdBanner';

interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  thumb: string;
  readingTime: number;
  author: any;
  featured: boolean;
  draft: boolean;
}

// 検索用の記事データを取得する関数（実際の記事データを返すよう調整してください）
async function getSearchableData(): Promise<PostMetadata[]> {
  // この部分は実際の記事データ取得ロジックに合わせて調整
  try {
    // 例：APIエンドポイントから取得、またはbuildTimeでJSONファイルを生成
    const response = await fetch('/api/posts');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
  
  // フォールバック：空の配列を返す
  return [];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [searchResults, setSearchResults] = useState<PostMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL hashからクエリを取得
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#q=')) {
        const searchQuery = decodeURIComponent(hash.substring(3));
        setQuery(searchQuery);
      }
    };

    // 初回読み込み時
    handleHashChange();
    
    // hashの変更を監視
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    // 記事データを取得
    getSearchableData().then(data => {
      setPosts(data.filter(post => !post.draft));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // 検索実行
    if (query && posts.length > 0) {
      const searchTerm = query.toLowerCase();
      const results = posts.filter(post => {
        return (
          post.title.toLowerCase().includes(searchTerm) ||
          post.description.toLowerCase().includes(searchTerm) ||
          post.category.toLowerCase().includes(searchTerm) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      });
      
      // 関連度順にソート
      results.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(searchTerm) ? 1 : 0;
        const bTitle = b.title.toLowerCase().includes(searchTerm) ? 1 : 0;
        if (aTitle !== bTitle) return bTitle - aTitle;
        
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query, posts]);

  // テキストハイライト関数
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span style="background-color: #fef3c7; padding: 0 2px;">$1</span>');
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: searchPageStyles }} />
      
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <div className="content-layout">
          <main className="main-content-area" style={{ flex: 1 }}>
            {/* Page Header */}
            <section className="page-header">
              <div className="container">
                {query ? (
                  <>
                    <div className="search-info">
                      <SearchIcon size={20} color="#666" />
                      <span className="search-query">{query}</span>
                      <span>の検索結果</span>
                    </div>
                    <h1 className="page-title">検索結果</h1>
                    {!loading && (
                      <p className="result-count">{searchResults.length}件の記事が見つかりました</p>
                    )}
                  </>
                ) : (
                  <>
                    <h1 className="page-title">検索</h1>
                    <p className="page-description">記事を検索できます。右側の検索ボックスからキーワードを入力してください。</p>
                  </>
                )}
              </div>
            </section>

            {/* Search Results */}
            <section className="search-results">
              <div className="container">
                {loading ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">⏳</div>
                    <h3>検索データを読み込み中...</h3>
                  </div>
                ) : query ? (
                  searchResults.length > 0 ? (
                    <div className="results-grid">
                      {searchResults.map((post) => (
                        <article key={post.slug} className="article-card">
                          <img 
                            src={post.thumb || '/placeholder-image.jpg'} 
                            alt={post.title}
                            className="article-image"
                          />
                          <div className="article-content">
                            <span className="article-category">{post.category}</span>
                            <h3 
                              className="article-title"
                              dangerouslySetInnerHTML={{ __html: highlightText(post.title, query) }}
                            />
                            <p 
                              className="article-excerpt"
                              dangerouslySetInnerHTML={{ __html: highlightText(post.description, query) }}
                            />
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
                  ) : (
                    <div className="empty-state">
                      <div className="empty-state-icon">🔍</div>
                      <h3>検索結果が見つかりませんでした</h3>
                      <p>「{query}」に関する記事は見つかりませんでした。</p>
                      <p>別のキーワードで検索してみてください。</p>
                      <a href="/posts">すべての記事を見る</a>
                    </div>
                  )
                ) : (
                  <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h3>記事を検索</h3>
                    <p>右側の検索ボックスからキーワードを入力して記事を検索できます。</p>
                    <a href="/posts">すべての記事を見る</a>
                  </div>
                )}
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

const searchPageStyles = `
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

  /* Layout */
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

  .main-content {
    background: white;
  }

  /* Page header */
  .page-header {
    padding: 40px 0 20px 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .search-info {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .search-query {
    background: #00d084;
    color: white;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
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

  .result-count {
    color: #999;
    font-size: 14px;
  }

  /* Search results */
  .search-results {
    padding: 40px 0;
  }

  .results-grid {
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

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 60px 0;
    color: #666;
  }

  .empty-state-icon {
    font-size: 3rem;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  .empty-state h3 {
    font-size: 1.25rem;
    margin-bottom: 8px;
    color: #333;
  }

  .empty-state p {
    margin-bottom: 16px;
  }

  .empty-state a {
    color: #00d084;
    text-decoration: underline;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .content-layout {
      flex-direction: column;
    }
  }

  @media (max-width: 640px) {
    .container {
      padding: 0 16px;
    }
    
    .results-grid {
      grid-template-columns: 1fr;
    }
    
    .content-layout {
      padding: 0 16px;
    }
  }
`;
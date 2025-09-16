import { Metadata } from 'next';
import { Search, Filter, Calendar, TrendingUp } from 'lucide-react';
import { Header, Footer, PostCard } from '@/components';
import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import type { PostMetadata } from '@/types/post';

export const metadata: Metadata = {
  title: '記事一覧 | トリフレメディア',
  description: '一人旅に関する最新記事をすべてご覧いただけます。カテゴリや人気順でソートして、あなたにぴったりの記事を見つけましょう。',
};

const postsPageStyles = `
  .page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
  
  .page-header {
    background: linear-gradient(90deg, #ecfdf5 0%, #d1fae5 100%);
    padding: 32px 0;
  }
  
  @media (min-width: 768px) {
    .page-header {
      padding: 64px 0;
    }
  }
  
  .container {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  .header-content {
    text-align: center;
    max-width: 100%;
  }
  
  .page-title {
    font-size: clamp(1.5rem, 5vw, 2.25rem);
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 8px;
    line-height: 1.2;
    word-break: keep-all;
    overflow-wrap: break-word;
  }
  
  @media (min-width: 768px) {
    .page-title {
      margin-bottom: 16px;
    }
  }
  
  .page-description {
    font-size: clamp(0.875rem, 3vw, 1.25rem);
    color: #6b7280;
    margin-bottom: 20px;
    line-height: 1.4;
    word-break: keep-all;
    overflow-wrap: break-word;
  }
  
  @media (min-width: 768px) {
    .page-description {
      margin-bottom: 32px;
      line-height: 1.6;
    }
  }
  
  .search-container {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  
  @media (min-width: 640px) {
    .search-container {
      max-width: 340px;
    }
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
  
  .search-input {
    width: 100%;
    padding: 12px 16px 12px 48px;
    border-radius: 12px;
    border: 1px solid #d1d5db;
    background-color: white;
    outline: none;
    transition: all 0.2s;
    font-size: 16px;
  }
  
  .search-input:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  .main-content {
    flex: 1;
  }
  
  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 32px 0;
  }
  
  @media (min-width: 768px) {
    .content-grid {
      gap: 32px;
      padding: 48px 0;
    }
  }
  
  @media (min-width: 1024px) {
    .content-grid {
      grid-template-columns: 320px 1fr;
    }
  }
  
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
    order: 2;
  }
  
  @media (min-width: 768px) {
    .sidebar {
      gap: 24px;
    }
  }
  
  @media (min-width: 1024px) {
    .sidebar {
      order: 1;
      gap: 32px;
    }
  }
  
  .sidebar-card {
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  @media (min-width: 768px) {
    .sidebar-card {
      padding: 24px;
    }
  }
  
  .sidebar-title {
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
  }
  
  @media (min-width: 768px) {
    .sidebar-title {
      font-size: 1.125rem;
    }
  }
  
  .filter-section {
    margin-bottom: 20px;
  }
  
  @media (min-width: 768px) {
    .filter-section {
      margin-bottom: 24px;
    }
  }
  
  .filter-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
  }
  
  .filter-select {
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background-color: white;
    outline: none;
    transition: border-color 0.2s;
    font-size: 16px;
  }
  
  @media (min-width: 768px) {
    .filter-select {
      padding: 8px;
      font-size: 14px;
    }
  }
  
  .filter-select:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  @media (min-width: 768px) {
    .checkbox-group {
      gap: 8px;
    }
  }
  
  .checkbox-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px 0;
  }
  
  .checkbox-input {
    margin-right: 12px;
    accent-color: #10b981;
    transform: scale(1.2);
  }
  
  @media (min-width: 768px) {
    .checkbox-input {
      margin-right: 8px;
      transform: scale(1);
    }
  }
  
  .checkbox-label {
    font-size: 0.875rem;
    color: #6b7280;
    user-select: none;
  }
  
  .tag-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .tag {
    padding: 8px 16px;
    background-color: #f3f4f6;
    color: #374151;
    font-size: 0.75rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s;
    touch-action: manipulation;
  }
  
  @media (min-width: 768px) {
    .tag {
      padding: 4px 12px;
    }
  }
  
  .tag:hover {
    background-color: #ecfdf5;
    color: #10b981;
  }
  
  .tag:active {
    transform: scale(0.95);
  }
  
  .main-column {
    display: flex;
    flex-direction: column;
    order: 1;
  }
  
  @media (min-width: 1024px) {
    .main-column {
      order: 2;
    }
  }
  
  .section {
    margin-bottom: 32px;
  }
  
  @media (min-width: 768px) {
    .section {
      margin-bottom: 48px;
    }
  }
  
  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
  }
  
  @media (min-width: 768px) {
    .section-header {
      margin-bottom: 24px;
    }
  }
  
  .section-title {
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    font-weight: bold;
    color: #1f2937;
  }
  
  .posts-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  @media (min-width: 640px) {
    .posts-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
  }
  
  @media (min-width: 1280px) {
    .posts-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .empty-state {
    text-align: center;
    padding: 32px 0;
    color: #9ca3af;
  }
  
  @media (min-width: 768px) {
    .empty-state {
      padding: 48px 0;
    }
  }
  
  .pagination {
    margin-top: 32px;
    display: flex;
    justify-content: center;
    padding-bottom: 32px;
  }
  
  @media (min-width: 768px) {
    .pagination {
      margin-top: 48px;
    }
  }
  
  .pagination-nav {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  @media (min-width: 768px) {
    .pagination-nav {
      gap: 8px;
      flex-wrap: nowrap;
    }
  }
  
  .pagination-button {
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    color: #6b7280;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    font-size: 0.875rem;
    min-width: 44px;
    text-align: center;
    touch-action: manipulation;
  }
  
  @media (min-width: 768px) {
    .pagination-button {
      padding: 8px 16px;
      min-width: auto;
    }
  }
  
  .pagination-button:hover {
    background-color: #f9fafb;
  }
  
  .pagination-button:active {
    transform: scale(0.95);
  }
  
  .pagination-button-active {
    background-color: #10b981;
    color: white;
    border-color: #10b981;
  }
  
  .pagination-button-active:hover {
    background-color: #059669;
  }
  
  /* モバイル専用のスタイル */
  @media (max-width: 767px) {
    .mobile-hidden {
      display: none;
    }
    
    .mobile-sticky-search {
      position: sticky;
      top: 0;
      z-index: 10;
      background: white;
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;
      margin: 0 -16px 16px -16px;
    }
    
    .sidebar-card {
      margin: 0 -8px;
    }
    
    .filter-section:last-child {
      margin-bottom: 0;
    }
  }
  
  /* タッチデバイス用の改善 */
  @media (hover: none) and (pointer: coarse) {
    .checkbox-item:hover {
      background-color: #f9fafb;
    }
    
    .tag:hover {
      background-color: #f3f4f6;
      color: #374151;
    }
    
    .pagination-button:hover {
      background-color: white;
    }
    
    .pagination-button-active:hover {
      background-color: #10b981;
    }
  }
`;

export default async function PostsPage() {
  let allPosts: PostMetadata[] = [];
  try {
    allPosts = await getAllPosts();
  } catch (error) {
    console.error('Error loading posts:', error);
    allPosts = [];
  }

  const publishedPosts: PostMetadata[] = allPosts.filter((post: PostMetadata) => !post.draft);
  const sortedPosts: PostMetadata[] = publishedPosts.sort((a: PostMetadata, b: PostMetadata) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featuredPosts: PostMetadata[] = publishedPosts.filter((post: PostMetadata) => post.featured);
  const regularPosts: PostMetadata[] = publishedPosts.filter((post: PostMetadata) => !post.featured);

  const categoryStats: Record<string, number> = publishedPosts.reduce((acc: Record<string, number>, post: PostMetadata) => {
    const category: string = post.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: postsPageStyles }} />
      
      <div className="page-container">
        <Header />
        
        <main className="main-content">
          {/* ページヘッダー */}
          <section className="page-header">
            <div className="container">
              <div className="header-content">
                <h1 className="page-title">
                  記事一覧
                </h1>
              </div>
            </div>
          </section>

          <div className="container">
            <div className="content-grid">
              
              {/* サイドバー */}
              <aside className="sidebar">
                
                {/* フィルター */}
                <div className="sidebar-card">
                  <h3 className="sidebar-title">
                    <Filter style={{ width: '20px', height: '20px' }} />
                    フィルター
                  </h3>
                  
                  {/* ソート */}
                  <div className="filter-section">
                    <label className="filter-label">
                      並び順
                    </label>
                    <select className="filter-select">
                      <option value="latest">最新順</option>
                      <option value="popular">人気順</option>
                      <option value="category">カテゴリ別</option>
                    </select>
                  </div>
                  
                  {/* カテゴリフィルター */}
                  <div>
                    <label className="filter-label">
                      カテゴリ
                    </label>
                    <div className="checkbox-group">
                      <label className="checkbox-item">
                        <input type="checkbox" className="checkbox-input" defaultChecked />
                        <span className="checkbox-label">すべて</span>
                      </label>
                      {CATEGORIES.map((category) => (
                        <label key={category.slug} className="checkbox-item">
                          <input type="checkbox" className="checkbox-input" />
                          <span className="checkbox-label">
                            {category.name} ({categoryStats[category.name] || 0})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 人気タグ */}
                <div className="sidebar-card">
                  <h3 className="sidebar-title">
                    <TrendingUp style={{ width: '20px', height: '20px' }} />
                    人気タグ
                  </h3>
                  <div className="tag-grid">
                    {['一人旅', '初心者', '国内', '海外', '安全', '予算', 'プラン', '体験談'].map((tag: string) => (
                      <span key={tag} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>

              {/* メインコンテンツ */}
              <div className="main-column">
                
                {/* 注目記事 */}
                {featuredPosts.length > 0 && (
                  <section className="section">
                    <div className="section-header">
                      <span style={{ fontSize: '1.5rem' }}>⭐</span>
                      <h2 className="section-title">
                        注目記事
                      </h2>
                    </div>
                    
                    <div className="posts-grid">
                      {featuredPosts.slice(0, 4).map((post: PostMetadata) => (
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
                  </section>
                )}

                {/* 最新記事 */}
                <section className="section">
                  <div className="section-header">
                    <Calendar style={{ width: '24px', height: '24px', color: '#10b981' }} />
                    <h2 className="section-title">
                      最新記事
                    </h2>
                  </div>
                  
                  {sortedPosts.length > 0 ? (
                    <div className="posts-grid">
                      {sortedPosts.map((post: PostMetadata) => (
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
                  ) : (
                    <div className="empty-state">
                      <p>
                        記事を準備中です。しばらくお待ちください。
                      </p>
                    </div>
                  )}
                </section>
                
                {/* ページネーション */}
                {sortedPosts.length > 12 && (
                  <div className="pagination">
                    <nav className="pagination-nav">
                      <button className="pagination-button">
                        前へ
                      </button>
                      <button className="pagination-button pagination-button-active">
                        1
                      </button>
                      <button className="pagination-button">
                        2
                      </button>
                      <button className="pagination-button">
                        3
                      </button>
                      <button className="pagination-button">
                        次へ
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
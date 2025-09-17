import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Header, Footer, PostCard } from '@/components';
import { getAllPosts } from '@/lib/posts';
import type { PostMetadata } from '@/types/post';

export const metadata: Metadata = {
  title: '記事一覧 | トリフレメディア',
  description: '一人旅に関する最新記事をすべてご覧いただけます。',
};

const postsPageStyles = `
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

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .page-header {
    padding: 40px 0 20px 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .page-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 16px;
  }

  .page-description {
    color: #666;
    margin-bottom: 0;
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

  /* Category section - like SingaLife */
  .category-section {
    padding: 40px 0;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
  }

  .category-title {
    font-size: 1.5rem;
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
    
    .pagination {
      flex-wrap: wrap;
    }
    
    .category-grid {
      justify-content: center;
    }
  }
`;

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

export default async function PostsPage() {
  let allPosts: ExtendedPostMetadata[] = [];
  try {
    allPosts = await getAllPosts() as ExtendedPostMetadata[];
  } catch (error) {
    console.error('Error loading posts:', error);
    allPosts = [];
  }

  const publishedPosts: ExtendedPostMetadata[] = allPosts.filter((post: ExtendedPostMetadata) => !post.draft);
  const sortedPosts: ExtendedPostMetadata[] = publishedPosts.sort((a: ExtendedPostMetadata, b: ExtendedPostMetadata) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
      <style dangerouslySetInnerHTML={{ __html: postsPageStyles }} />
      
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header コンポーネントを使用 */}
        <Header />

        <main className="main-content" style={{ flex: 1 }}>
          {/* Page Header */}
          <section className="page-header">
            <div className="container">
              <h1 className="page-title">記事一覧</h1>
              <p className="page-description">一人旅に関する最新記事をすべてご覧いただけます。</p>
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

                  {/* Pagination */}
                  <div className="pagination">
                    <a href="#" className="pagination-button active">1</a>
                    <a href="#" className="pagination-button">2</a>
                    <a href="#" className="pagination-button">3</a>
                    <a href="#" className="pagination-button">4</a>
                    <a href="#" className="pagination-button">5</a>
                    <a href="#" className="pagination-next">
                      次のページへ
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <p>記事を準備中です。しばらくお待ちください。</p>
                </div>
              )}
            </div>
          </section>

          {/* Categories Section */}
          <section className="category-section">
            <div className="container">
              <h2 className="category-title">カテゴリー</h2>
              <div className="category-grid">
                {categories.map((category) => (
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
    </>
  );
}
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Header, Footer } from '@/components';
import AdBanner from '@/components/AdBannerServer';
import { getAllPosts } from '@/lib/posts';
import { getUnsplashUrl } from '@/lib/utils';

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

  /* Results info */
  .results-info {
    text-align: center;
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
  }

  /* Category section */
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
  }
`;

interface PostMetadata {
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

const categories = [
  { name: '国内旅行', slug: 'domestic' },
  { name: '海外旅行', slug: 'international' },
  { name: 'グルメ', slug: 'gourmet' },
  { name: '宿泊', slug: 'accommodation' },
  { name: '旅のコツ', slug: 'tips' },
];

export default async function PostsPage() {
  let posts: PostMetadata[] = [];
  try {
    posts = (await getAllPosts() as PostMetadata[]).filter(p => !p.draft);
  } catch (error) {
    console.error('Error loading posts:', error);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: postsPageStyles }} />

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <div className="content-layout">
          <main className="main-content-area" style={{ flex: 1 }}>
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
                {posts.length > 0 ? (
                  <>
                    <div className="results-info">全{posts.length}件の記事</div>

                    <div className="posts-grid">
                      {posts.map((post: PostMetadata, index: number) => (
                        <article key={post.slug} className="article-card">
                          <img
                            src={getUnsplashUrl(post.thumb, 640) || '/placeholder-image.jpg'}
                            alt={post.title}
                            className="article-image"
                            width="400"
                            height="225"
                            loading={index < 6 ? 'eager' : 'lazy'}
                          />
                          <div className="article-content">
                            <span className="article-category">{post.category}</span>
                            <h3 className="article-title">{post.title}</h3>
                            <p className="article-excerpt">{post.description}</p>
                            <div className="article-meta">
                              <span>{new Date(post.date).toLocaleDateString('ja-JP')}</span>
                              <span>{post.readingTime}分</span>
                            </div>
                            <Link href={`/posts/${post.slug}/`} className="read-more-button">
                              この記事を見る
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        </article>
                      ))}
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
                    <Link key={category.slug} href={`/categories/${category.slug}/`} className="category-tag">
                      {category.name}
                    </Link>
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

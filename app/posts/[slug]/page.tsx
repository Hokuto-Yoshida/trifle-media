import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { Header, Footer } from '@/components';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import Link from 'next/link';

interface PostPageProps {
  params: {
    slug: string;
  };
}

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
  content?: string;
  filePath?: string;
}

export async function generateStaticParams() {
  return [
    { slug: 'solo-travel-guide-2025' },
    { slug: 'overseas-solo-travel-english-guide-2025' },
    { slug: 'kyushu-solo-travel-model-plans-2025' },
    { slug: 'solo-travel-accommodation-guide-2025' },
    { slug: 'solo-travel-dining-complete-guide-2025' },
    { slug: 'smartphone-solo-travel-guide-2025' },
    { slug: 'solo-travel-packing-checklist-2025' },
    { slug: 'parent-consent-solo-travel-guide-2025' },
    { slug: 'overnight-bus-solo-travel-guide-2025' },
    { slug: 'kyoto-solo-travel-guide-2025' },
    { slug: 'smartphone-travel-photography-guide-2025' },
  ]
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug) as ExtendedPostMetadata;
    
    if (!post) {
      return {
        title: '記事が見つかりません | トリフレメディア',
        description: '指定された記事は存在しません。',
      };
    }

    return {
      title: `${post.title} | トリフレメディア`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: post.thumb ? [post.thumb] : [],
      },
    };
  } catch (error) {
    return {
      title: '記事が見つかりません | トリフレメディア',
      description: '指定された記事は存在しません。',
    };
  }
}

const postPageStyles = `
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

  .post-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    background: white;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Back navigation */
  .back-nav {
    padding: 20px 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #00d084;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #059669;
  }

  /* Article header */
  .article-header {
    padding: 40px 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .article-category {
    display: inline-block;
    background: #00d084;
    color: white;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 16px;
    text-decoration: none;
  }

  .article-title {
    font-size: 2.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 16px;
    line-height: 1.2;
  }

  .article-description {
    font-size: 1.125rem;
    color: #6b7280;
    margin-bottom: 24px;
    line-height: 1.6;
  }

  .article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    font-size: 14px;
    color: #6b7280;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }

  .tag {
    background: #f3f4f6;
    color: #374151;
    padding: 4px 8px;
    font-size: 12px;
    text-decoration: none;
    transition: background-color 0.2s;
  }

  .tag:hover {
    background: #e5e7eb;
  }

  /* Article image */
  .article-image-section {
    padding: 40px 0;
  }

  .article-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }

  /* Article content */
  .article-content {
    padding: 40px 0;
    max-width: none;
  }

  .article-content h1,
  .article-content h2,
  .article-content h3,
  .article-content h4,
  .article-content h5,
  .article-content h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
    line-height: 1.3;
    color: #1f2937;
  }

  .article-content h1 {
    font-size: 2rem;
    border-bottom: 2px solid #00d084;
    padding-bottom: 0.5rem;
  }

  .article-content h2 {
    font-size: 1.75rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.25rem;
  }

  .article-content h3 {
    font-size: 1.5rem;
  }

  .article-content p {
    margin-bottom: 1.5rem;
    line-height: 1.8;
  }

  .article-content img {
    max-width: 100%;
    height: auto;
    margin: 2rem 0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .article-content ul,
  .article-content ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  .article-content li {
    margin-bottom: 0.5rem;
  }

  .article-content blockquote {
    border-left: 4px solid #00d084;
    padding-left: 1rem;
    margin: 2rem 0;
    font-style: italic;
    color: #6b7280;
  }

  .article-content strong {
    color: #00d084;
    font-weight: 600;
  }

  .article-content a {
    color: #00d084;
    text-decoration: underline;
  }

  .article-content a:hover {
    color: #059669;
  }

  .article-content hr {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 3rem 0;
  }

  /* Related articles */
  .related-articles {
    padding: 40px 0;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
  }

  .related-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 24px;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .related-card {
    background: white;
    border: 1px solid #e5e7eb;
    padding: 16px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
  }

  .related-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }

  .related-card-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .related-card-meta {
    font-size: 12px;
    color: #6b7280;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .container {
      padding: 0 16px;
    }
    
    .article-title {
      font-size: 1.75rem;
    }
    
    .article-meta {
      flex-direction: column;
      gap: 12px;
    }
    
    .article-image {
      height: 250px;
    }
    
    .article-content h1 {
      font-size: 1.5rem;
    }
    
    .article-content h2 {
      font-size: 1.25rem;
    }
  }
`;

export default async function PostPage({ params }: PostPageProps) {
  let post: ExtendedPostMetadata;
  
  try {
    post = await getPostBySlug(params.slug) as ExtendedPostMetadata;
    if (!post || post.draft) {
      notFound();
    }
  } catch (error) {
    console.error('Error loading post:', error);
    notFound();
  }

  // 関連記事を取得（同じカテゴリの他の記事）
  let relatedPosts: ExtendedPostMetadata[] = [];
  try {
    const allPosts = await getAllPosts() as ExtendedPostMetadata[];
    relatedPosts = allPosts
      .filter((p: ExtendedPostMetadata) => 
        !p.draft && 
        p.slug !== post.slug && 
        p.category === post.category
      )
      .slice(0, 3);
  } catch (error) {
    console.error('Error loading related posts:', error);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: postPageStyles }} />
      
      <div className="post-page">
        <Header />
        
        <main className="main-content">
          {/* Back Navigation */}
          <section className="back-nav">
            <div className="container">
              <Link href="/posts" className="back-link">
                <ArrowLeft size={16} />
                記事一覧に戻る
              </Link>
            </div>
          </section>

          {/* Article Header */}
          <section className="article-header">
            <div className="container">
              <Link href={`/categories/${getCategorySlug(post.category)}`} className="article-category">
                {post.category}
              </Link>
              
              <h1 className="article-title">{post.title}</h1>
              <p className="article-description">{post.description}</p>
              
              <div className="article-meta">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{new Date(post.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>約{post.readingTime}分で読めます</span>
                </div>
                <div className="meta-item">
                  <User size={16} />
                  <span>{post.author?.name || 'トリフレ編集部'}</span>
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="article-tags">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="tag">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Article Image */}
          {post.thumb && (
            <section className="article-image-section">
              <div className="container">
                <img 
                  src={post.thumb} 
                  alt={post.title}
                  className="article-image"
                />
              </div>
            </section>
          )}

          {/* Article Content */}
          <section className="article-content">
            <div className="container">
              {post.content && (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
            </div>
          </section>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="related-articles">
              <div className="container">
                <h2 className="related-title">関連記事</h2>
                <div className="related-grid">
                  {relatedPosts.map((relatedPost: ExtendedPostMetadata) => (
                    <Link key={relatedPost.slug} href={`/posts/${relatedPost.slug}`} className="related-card">
                      <h3 className="related-card-title">{relatedPost.title}</h3>
                      <div className="related-card-meta">
                        {relatedPost.category} • {new Date(relatedPost.date).toLocaleDateString('ja-JP')}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        
        <Footer />
      </div>
    </>
  );
}

// カテゴリ名からスラッグを取得するヘルパー関数
function getCategorySlug(categoryName: string): string {
  const categoryMapping: Record<string, string> = {
    '国内旅行': 'domestic',
    '海外旅行': 'international',
    'グルメ': 'gourmet',
    '宿泊': 'accommodation',
    '安全・準備': 'safety',
    '旅のコツ': 'tips',
  };
  
  return categoryMapping[categoryName] || 'domestic';
}
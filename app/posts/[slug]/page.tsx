import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, Tag, MapPin, Users } from 'lucide-react';
import { Header, Footer } from '@/components';
import AdBanner from '@/components/AdBanner';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import Link from 'next/link';
import TableOfContents from '@/components/TableOfContents';

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
  try {
    const posts = await getAllPosts();
    return posts
      .filter((post: ExtendedPostMetadata) => !post.draft && post.slug)
      .map((post: ExtendedPostMetadata) => ({ slug: post.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
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
    overflow-x: hidden;
  }

  .post-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  .main-content {
    flex: 1;
    background: white;
    overflow-x: hidden;
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
    overflow-x: hidden;
  }

  .content-layout {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    gap: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .main-content-area {
    flex: 1;
    min-width: 0;
    max-width: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  .container {
    max-width: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  @media (max-width: 1024px) {
    .content-layout {
      flex-direction: column;
      padding: 0 20px;
      max-width: 100%;
    }
    
    .main-content-area {
      max-width: 100%;
      width: 100%;
    }
  }

  /* Back navigation */
  .back-nav {
    padding: 20px 0;
    border-bottom: 1px solid #e5e7eb;
    width: 100%;
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
    width: 100%;
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
    word-break: break-word;
    overflow-wrap: break-word;
  }

  .article-description {
    font-size: 1.125rem;
    color: #6b7280;
    margin-bottom: 24px;
    line-height: 1.6;
    word-break: break-word;
    overflow-wrap: break-word;
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
    width: 100%;
  }

  .article-image {
    width: 100%;
    max-width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }

  /* Article content */
  .article-content {
    padding: 40px 0;
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    overflow-x: hidden;
    width: 100%;
  }

  .article-content * {
    max-width: 100%;
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
    word-break: break-word;
    overflow-wrap: break-word;
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
    word-break: break-word;
  }

  .article-content img {
    max-width: 100%;
    width: 100%;
    height: auto;
    margin: 2rem 0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    display: block;
  }

  .article-content ul,
  .article-content ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    max-width: 100%;
  }

  .article-content li {
    margin-bottom: 0.5rem;
    word-break: break-word;
  }

  .article-content blockquote {
    border-left: 4px solid #00d084;
    padding-left: 1rem;
    margin: 2rem 0;
    font-style: italic;
    color: #6b7280;
    max-width: 100%;
  }

  .article-content strong {
    color: #00d084;
    font-weight: 600;
  }

  .article-content a {
    color: #00d084;
    text-decoration: underline;
    word-break: break-all;
  }

  .article-content a:hover {
    color: #059669;
  }

  .article-content hr {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 3rem 0;
  }

  .article-content table {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    display: block;
    border-collapse: collapse;
    margin: 2rem 0;
  }

  .article-content pre {
    overflow-x: auto;
    max-width: 100%;
    padding: 1rem;
    background: #f3f4f6;
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  .article-content code {
    word-break: break-all;
    overflow-wrap: break-word;
  }

  /* Author section */
  .author-section {
    padding: 40px 0;
    border-top: 1px solid #e5e7eb;
    background: #ffffff;
    width: 100%;
  }

  .author-box {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    max-width: 100%;
  }

  .author-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  .author-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00d084, #4ECDC4);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .author-info h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 4px;
  }

  .author-info .author-role {
    font-size: 14px;
    color: #6b7280;
  }

  .author-description {
    font-size: 14px;
    line-height: 1.6;
    color: #374151;
    margin-bottom: 16px;
  }

  .author-stats {
    display: flex;
    gap: 24px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #6b7280;
  }

  .stat-number {
    font-weight: 600;
    color: #00d084;
  }

  /* Related articles */
  .related-articles {
    padding: 40px 0;
    border-top: 1px solid #e5e7eb;
    background: white;
    width: 100%;
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
    word-break: break-word;
  }

  .related-card-meta {
    font-size: 12px;
    color: #6b7280;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .content-layout {
      padding: 0 16px;
    }

    .container {
      padding: 0;
    }
    
    .article-title {
      font-size: 1.5rem;
    }
    
    .article-description {
      font-size: 1rem;
    }
    
    .article-meta {
      flex-direction: column;
      gap: 12px;
    }
    
    .article-image {
      height: 250px;
    }
    
    .article-content {
      padding: 40px 0;
      font-size: 16px;
    }
    
    .article-content h1 {
      font-size: 1.4rem;
    }
    
    .article-content h2 {
      font-size: 1.2rem;
    }

    .article-content h3 {
      font-size: 1.1rem;
    }

    .article-content ul,
    .article-content ol {
      padding-left: 1.5rem;
    }

    .author-header {
      flex-direction: column;
      text-align: center;
    }

    .author-stats {
      flex-direction: column;
      gap: 12px;
    }

    .related-grid {
      grid-template-columns: 1fr;
    }

    .article-tags {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

  @media (max-width: 360px) {
    .content-layout {
      padding: 0 12px;
    }

    .article-content {
      font-size: 15px;
    }

    .article-title {
      font-size: 1.3rem;
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
        
        <div className="content-layout">
          <main className="main-content-area">
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

          <TableOfContents />

          {/* Article Content */}
          <section className="article-content">
            <div className="container">
              {post.content && (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
            </div>
          </section>

          {/* Author Section */}
          <section className="author-section">
            <div className="container">
              <div className="author-box">
                <div className="author-header">
                  <div className="author-avatar">
                    <User size={28} color="white" />
                  </div>
                  <div className="author-info">
                    <h3>トリフレ編集部</h3>
                    <div className="author-role">一人旅専門メディア</div>
                  </div>
                </div>
                <div className="author-description">
                  編集部メンバーの豊富な旅行経験をもとに、安全で楽しい一人旅のための情報をお届けしています。実際の旅行体験に基づいた実用的なアドバイスで、あなたの一人旅をサポートします。
                </div>
                <div className="author-stats">
                  <div className="stat-item">
                    <MapPin size={14} />
                    <span>編集部総計<span className="stat-number">60カ国</span>の旅行経験</span>
                  </div>
                </div>
              </div>
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
        
        <AdBanner />
      </div>
        
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

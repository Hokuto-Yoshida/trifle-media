import { Metadata } from 'next';
import { Header, Footer, CategoryGrid } from '@/components';
import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import type { Category } from '@/types/category';
import type { PostMetadata } from '@/types/post';

export const metadata: Metadata = {
  title: 'カテゴリ一覧 | トリフレメディア',
  description: '一人旅に関する記事をカテゴリ別にご覧いただけます。あなたの興味に合ったカテゴリから記事を探してみましょう。',
};

const categoryPageStyles = `
  .page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
  
  .page-header {
    background: linear-gradient(90deg, #ecfdf5 0%, #d1fae5 100%);
    padding: 64px 0;
  }
  
  .container {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  .header-content {
    text-align: center;
  }
  
  .page-title {
    font-size: 2.25rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 16px;
  }
  
  .page-description {
    font-size: 1.25rem;
    color: #6b7280;
    margin-bottom: 32px;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    max-width: 512px;
    margin: 0 auto;
  }
  
  @media (min-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: #10b981;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .main-content {
    flex: 1;
  }
  
  .section {
    padding: 64px 0;
  }
  
  .section-spacing {
    margin-bottom: 64px;
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
  
  .info-card {
    background-color: #f9fafb;
    border-radius: 12px;
    padding: 32px;
    margin-top: 64px;
  }
  
  .info-card-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 24px;
    text-align: center;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  @media (min-width: 768px) {
    .info-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .info-section-title {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 12px;
  }
  
  .info-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .info-list-item {
    color: #6b7280;
    padding-left: 16px;
    position: relative;
  }
  
  .info-list-item::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
  }
  
  .cta-section {
    margin-top: 32px;
    text-align: center;
  }
  
  .cta-description {
    color: #6b7280;
    margin-bottom: 16px;
  }
  
  .cta-button {
    display: inline-block;
    padding: 12px 32px;
    background-color: #10b981;
    color: white;
    font-weight: 600;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s;
  }
  
  .cta-button:hover {
    background-color: #059669;
    transform: translateY(-1px);
  }
`;

export default async function CategoryPage() {
  let allPosts: PostMetadata[] = [];
  try {
    allPosts = await getAllPosts();
  } catch (error) {
    console.error('Error loading posts:', error);
    allPosts = [];
  }

  const publishedPosts: PostMetadata[] = allPosts.filter((post: PostMetadata) => !post.draft);

  // カテゴリ別記事数の計算
  const categoryStats: Record<string, number> = publishedPosts.reduce((acc: Record<string, number>, post: PostMetadata) => {
    const category: string = post.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // カテゴリにカウントを更新
  const categoriesWithCount: Category[] = CATEGORIES.map((category: Category) => ({
    ...category,
    count: categoryStats[category.name] || 0,
  }));

  const totalCategories: number = CATEGORIES.length;
  const totalPosts: number = publishedPosts.length;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: categoryPageStyles }} />
      
      <div className="page-container">
        <Header />
        
        <main className="main-content">
          {/* ページヘッダー */}
          <section className="page-header">
            <div className="container">
              <div className="header-content">
                <h1 className="page-title">
                  カテゴリ一覧
                </h1>
              </div>
            </div>
          </section>

          {/* カテゴリグリッド */}
          <section className="section">
            <div className="container">
              
              {/* 注目カテゴリ */}
              <div className="section-spacing">
                <div className="section-header">
                  <h2 className="section-title">
                    ⭐ 注目カテゴリ
                  </h2>
                  <p className="section-description">
                    人気の高いカテゴリから記事を探してみましょう
                  </p>
                </div>
                
                <CategoryGrid 
                  categories={categoriesWithCount.filter((cat: Category) => cat.featured)} 
                />
              </div>

              {/* 全カテゴリ */}
              <div>
                <div className="section-header">
                  <h2 className="section-title">
                    📚 すべてのカテゴリ
                  </h2>
                  <p className="section-description">
                    あなたの興味に合ったカテゴリを見つけてください
                  </p>
                </div>
                
                <CategoryGrid categories={categoriesWithCount} />
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
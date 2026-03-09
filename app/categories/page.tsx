import Link from 'next/link';
import type { Metadata } from 'next';
import { Header, Footer } from '@/components';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://torifure.com').replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'カテゴリ一覧 | トリフレメディア',
  description: '国内旅行、海外旅行、グルメ、宿泊、旅のコツなどカテゴリ別に記事を探せます。',
  alternates: {
    canonical: '/categories/',
  },
  openGraph: {
    title: 'カテゴリ一覧 | トリフレメディア',
    description: '国内旅行、海外旅行、グルメ、宿泊、旅のコツなどカテゴリ別に記事を探せます。',
    url: `${siteUrl}/categories/`,
  },
};

const categories = [
  { name: '国内旅行', href: '/categories/domestic/', description: '日本国内の一人旅スポットやモデルコース' },
  { name: '海外旅行', href: '/categories/international/', description: '海外一人旅の行き先選びと実践ガイド' },
  { name: 'グルメ', href: '/categories/gourmet/', description: '一人でも入りやすい店や食べ歩き情報' },
  { name: '宿泊', href: '/categories/accommodation/', description: 'ホテル・旅館・ゲストハウスの選び方' },
  { name: '旅のコツ', href: '/categories/tips/', description: '準備・安全対策・予算設計の実用ノウハウ' },
];

const styles = `
  .categories-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #ffffff;
  }

  .categories-main {
    flex: 1;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
    padding: 40px 20px 60px;
  }

  .categories-header {
    margin-bottom: 28px;
  }

  .categories-title {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 8px;
  }

  .categories-description {
    color: #4b5563;
    line-height: 1.7;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
  }

  .category-card {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background: #fff;
    padding: 18px 16px;
    text-decoration: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .category-card:hover {
    border-color: #00d084;
    box-shadow: 0 8px 18px rgba(16, 185, 129, 0.12);
  }

  .category-name {
    color: #111827;
    font-size: 1.06rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .category-copy {
    color: #6b7280;
    font-size: 0.92rem;
    line-height: 1.65;
  }
`;

export default function CategoriesPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="categories-page">
        <Header />
        <main className="categories-main">
          <header className="categories-header">
            <h1 className="categories-title">カテゴリ一覧</h1>
            <p className="categories-description">
              興味のあるテーマから記事を探せます。すべてのカテゴリページは個別に更新されています。
            </p>
          </header>
          <section className="categories-grid">
            {categories.map((category) => (
              <Link key={category.href} href={category.href} className="category-card">
                <h2 className="category-name">{category.name}</h2>
                <p className="category-copy">{category.description}</p>
              </Link>
            ))}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

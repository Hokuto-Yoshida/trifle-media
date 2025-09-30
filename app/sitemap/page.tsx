import { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components';
import { Home, FileText, Bookmark, Mail, Shield, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'サイトマップ | トリフレメディア',
  description: 'トリフレメディアの全ページ一覧です。一人旅に関する情報を探している方はこちらからお探しください。',
};

const sitemapStyles = `
  .sitemap-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #fafafa;
  }

  .sitemap-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    flex: 1;
  }

  .sitemap-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .sitemap-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 16px;
  }

  .sitemap-description {
    font-size: 1.125rem;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .sitemap-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
  }

  .sitemap-section {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border: 1px solid #e5e7eb;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #f3f4f6;
  }

  .section-icon {
    background: #00d084;
    color: white;
    padding: 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
  }

  .sitemap-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .sitemap-item {
    margin-bottom: 12px;
  }

  .sitemap-link {
    display: block;
    color: #374151;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.2s;
    font-size: 14px;
    border-left: 3px solid transparent;
  }

  .sitemap-link:hover {
    background: #f0f9ff;
    color: #00d084;
    border-left-color: #00d084;
    transform: translateX(4px);
  }

  .sitemap-sublist {
    list-style: none;
    margin: 8px 0 0 20px;
    padding: 0;
  }

  .sitemap-subitem {
    margin-bottom: 8px;
  }

  .sitemap-sublink {
    display: block;
    color: #6b7280;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 6px;
    transition: all 0.2s;
    font-size: 13px;
    border-left: 2px solid transparent;
  }

  .sitemap-sublink:hover {
    background: #f9fafb;
    color: #00d084;
    border-left-color: #00d084;
    transform: translateX(4px);
  }

  .category-section {
    margin-top: 40px;
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .category-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #e5e7eb;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s;
  }

  .category-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }

  .category-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
  }

  .category-description {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.5;
  }

  .recent-posts {
    margin-top: 40px;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .post-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #e5e7eb;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s;
  }

  .post-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }

  .post-title {
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .post-category {
    display: inline-block;
    background: #00d084;
    color: white;
    padding: 2px 8px;
    font-size: 12px;
    border-radius: 4px;
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    .sitemap-container {
      padding: 20px 16px;
    }

    .sitemap-title {
      font-size: 2rem;
    }

    .sitemap-content {
      grid-template-columns: 1fr;
    }

    .section-header {
      flex-direction: column;
      text-align: center;
    }
  }
`;

export default function SitemapPage() {
  const categories = [
    {
      name: '国内旅行',
      href: '/categories/domestic',
      description: '日本国内の一人旅情報',
      subcategories: [
        { name: '北海道・東北', href: '/categories/domestic/hokkaido-tohoku' },
        { name: '関東', href: '/categories/domestic/kanto' },
        { name: '中部・北陸', href: '/categories/domestic/chubu-hokuriku' },
        { name: '関西', href: '/categories/domestic/kansai' },
        { name: '中国・四国', href: '/categories/domestic/chugoku-shikoku' },
        { name: '九州・沖縄', href: '/categories/domestic/kyushu-okinawa' },
      ]
    },
    {
      name: '海外旅行',
      href: '/categories/international', 
      description: '海外一人旅の情報とガイド',
      subcategories: [
        { name: 'アジア', href: '/categories/international/asia' },
        { name: 'ヨーロッパ', href: '/categories/international/europe' },
        { name: '北米・南米', href: '/categories/international/americas' },
        { name: 'オセアニア', href: '/categories/international/oceania' },
        { name: '中東・アフリカ', href: '/categories/international/middle-east-africa' },
      ]
    },
    {
      name: 'グルメ',
      href: '/categories/gourmet',
      description: '一人でも楽しめるグルメ情報',
      subcategories: [
        { name: '和食', href: '/categories/gourmet/japanese' },
        { name: '洋食', href: '/categories/gourmet/western' },
        { name: '中華・アジア料理', href: '/categories/gourmet/asian' },
        { name: 'カフェ・スイーツ', href: '/categories/gourmet/cafe-sweets' },
      ]
    },
    {
      name: '宿泊',
      href: '/categories/accommodation',
      description: '一人旅におすすめの宿泊施設',
      subcategories: [
        { name: 'ホテル', href: '/categories/accommodation/hotel' },
        { name: '旅館・民宿', href: '/categories/accommodation/ryokan' },
        { name: 'ゲストハウス', href: '/categories/accommodation/guesthouse' },
        { name: 'グランピング・キャンプ', href: '/categories/accommodation/glamping' },
      ]
    },
    {
      name: '旅のコツ',
      href: '/categories/tips',
      description: '一人旅を楽しむためのコツ',
      subcategories: [
        { name: '安全・準備', href: '/categories/tips/safety' },
        { name: '計画・予算', href: '/categories/tips/planning' },
        { name: '持ち物・パッキング', href: '/categories/tips/packing' },
        { name: '写真・SNS', href: '/categories/tips/photography' },
        { name: 'トラブル対処', href: '/categories/tips/trouble' },
        { name: 'お得情報', href: '/categories/tips/deals' },
      ]
    }
  ];

  const recentPosts = [];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sitemapStyles }} />
      
      <div className="sitemap-page">
        <Header />
        
        <main className="sitemap-container">
          <div className="sitemap-header">
            <h1 className="sitemap-title">サイトマップ</h1>
            <p className="sitemap-description">
              トリフレメディアの全ページ一覧です。一人旅に関する情報をお探しの方は、こちらから目的のページをお探しください。
            </p>
          </div>

          <div className="sitemap-content">
            {/* メインページ */}
            <div className="sitemap-section">
              <div className="section-header">
                <div className="section-icon">
                  <Home size={20} />
                </div>
                <h2 className="section-title">メインページ</h2>
              </div>
              <ul className="sitemap-list">
                <li className="sitemap-item">
                  <Link href="/" className="sitemap-link">ホーム</Link>
                </li>
                <li className="sitemap-item">
                  <Link href="/posts" className="sitemap-link">記事一覧</Link>
                </li>
              </ul>
            </div>

            {/* カテゴリ別 */}
            <div className="sitemap-section">
              <div className="section-header">
                <div className="section-icon">
                  <Bookmark size={20} />
                </div>
                <h2 className="section-title">カテゴリ別</h2>
              </div>
              <ul className="sitemap-list">
                {categories.map((category) => (
                  <li key={category.href} className="sitemap-item">
                    <Link href={category.href} className="sitemap-link">
                      {category.name}
                    </Link>
                    {category.subcategories && (
                      <ul className="sitemap-sublist">
                        {category.subcategories.map((sub) => (
                          <li key={sub.href} className="sitemap-subitem">
                            <Link href={sub.href} className="sitemap-sublink">
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* サポートページ */}
            <div className="sitemap-section">
              <div className="section-header">
                <div className="section-icon">
                  <HelpCircle size={20} />
                </div>
                <h2 className="section-title">サポートページ</h2>
              </div>
              <ul className="sitemap-list">
                <li className="sitemap-item">
                  <Link href="/contact" className="sitemap-link">お問い合わせ</Link>
                </li>
                <li className="sitemap-item">
                  <Link href="/privacy" className="sitemap-link">プライバシーポリシー</Link>
                </li>
                <li className="sitemap-item">
                  <Link href="/terms" className="sitemap-link">利用規約</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* カテゴリ別記事へのリンク */}
          <div className="category-section">
            <h2 className="section-title" style={{marginBottom: '24px'}}>各カテゴリの記事一覧</h2>
            <div className="category-grid">
              {categories.map((category) => (
                <Link key={category.href} href={category.href} className="category-card">
                  <div className="category-name">{category.name}</div>
                  <div className="category-description">{category.description}</div>
                </Link>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
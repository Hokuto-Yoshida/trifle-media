import type { Metadata } from 'next';
import { Header, Footer } from '@/components';
import { MapPin, FileText, Globe, Mail, Twitter, Instagram } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://torifure.com').replace(/\/$/, '');

export const metadata: Metadata = {
  title: '著者プロフィール | トリフレメディア',
  description: 'トリフレメディア編集部のプロフィール。一人旅専門メディアとして、実際の旅行経験をもとに安心・安全な旅の情報をお届けします。',
  alternates: {
    canonical: '/author/',
  },
  openGraph: {
    title: '著者プロフィール | トリフレメディア',
    description: 'トリフレメディア編集部のプロフィール。一人旅専門メディアとして、実際の旅行経験をもとに安心・安全な旅の情報をお届けします。',
    url: `${siteUrl}/author/`,
  },
};

const pageStyles = `
  .author-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
  }

  .author-main {
    flex: 1;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    padding: 40px 20px 80px;
  }

  .author-card {
    background: white;
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    margin-bottom: 32px;
  }

  .author-top {
    display: flex;
    align-items: center;
    gap: 28px;
    margin-bottom: 28px;
  }

  .author-avatar-large {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00d084, #4ECDC4);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
  }

  .author-basic h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 4px;
  }

  .author-role-badge {
    display: inline-block;
    background: #e6faf3;
    color: #00a86b;
    font-size: 13px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 999px;
    margin-bottom: 12px;
  }

  .author-social {
    display: flex;
    gap: 12px;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #6b7280;
    text-decoration: none;
    font-size: 13px;
    transition: color 0.2s;
  }

  .social-link:hover {
    color: #00d084;
  }

  .author-bio {
    font-size: 15px;
    line-height: 1.8;
    color: #374151;
    margin-bottom: 28px;
  }

  .author-stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding-top: 24px;
    border-top: 1px solid #e5e7eb;
  }

  .stat-box {
    text-align: center;
    padding: 16px;
    background: #f9fafb;
    border-radius: 10px;
  }

  .stat-box-number {
    font-size: 2rem;
    font-weight: 700;
    color: #00d084;
    display: block;
    margin-bottom: 4px;
  }

  .stat-box-label {
    font-size: 13px;
    color: #6b7280;
  }

  .expertise-section {
    background: white;
    border-radius: 16px;
    padding: 32px 40px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    margin-bottom: 32px;
  }

  .section-heading {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid #00d084;
    display: inline-block;
  }

  .expertise-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .expertise-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    color: #374151;
    line-height: 1.5;
  }

  .expertise-icon {
    color: #00d084;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .policy-section {
    background: #fffbeb;
    border: 1px solid #fcd34d;
    border-radius: 12px;
    padding: 24px 32px;
    margin-bottom: 32px;
  }

  .policy-section h2 {
    font-size: 1rem;
    font-weight: 700;
    color: #92400e;
    margin-bottom: 12px;
  }

  .policy-section p {
    font-size: 14px;
    color: #78350f;
    line-height: 1.7;
    margin: 0;
  }

  .recent-articles-section {
    background: white;
    border-radius: 16px;
    padding: 32px 40px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .article-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .article-list-item {
    border-bottom: 1px solid #f3f4f6;
    padding: 14px 0;
  }

  .article-list-item:last-child {
    border-bottom: none;
  }

  .article-list-link {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  }

  .article-list-link:hover .article-list-title {
    color: #00d084;
  }

  .article-list-title {
    font-size: 14px;
    font-weight: 500;
    color: #1f2937;
    line-height: 1.5;
    transition: color 0.2s;
  }

  .article-list-meta {
    font-size: 12px;
    color: #9ca3af;
    flex-shrink: 0;
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    .author-card, .expertise-section, .recent-articles-section {
      padding: 24px 20px;
    }

    .author-top {
      flex-direction: column;
      text-align: center;
    }

    .author-social {
      justify-content: center;
    }

    .author-stats-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .expertise-list {
      grid-template-columns: 1fr;
    }

    .policy-section {
      padding: 20px;
    }
  }
`;

export default async function AuthorPage() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 8);
  const totalPosts = allPosts.length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'トリフレメディア編集部',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: '一人旅専門メディア「トリフレ」の編集部。旅行経験豊富なメンバーが、安心・安全な一人旅の情報をお届けします。',
    sameAs: [
      'https://twitter.com/trifle_media',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div className="author-page">
        <Header />
        <main className="author-main">

          {/* プロフィールカード */}
          <div className="author-card">
            <div className="author-top">
              <img
                src="/images/editor-avatar.png"
                alt="トリフレメディア編集部"
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              />
              <div className="author-basic">
                <h1>トリフレメディア編集部</h1>
                <span className="author-role-badge">一人旅専門メディア</span>
              </div>
            </div>

            <p className="author-bio">
              「トリフレメディア」は、一人旅を始めたい若者を応援する専門メディアです。編集部メンバーは、国内外を問わず豊富な一人旅経験を持ちます。失敗談も成功体験も包み隠さず紹介することで、初めての一人旅でも安心して旅立てるよう、実践的な情報をお届けしています。
              <br /><br />
              記事の情報は実際の旅行経験・現地調査・公式情報をもとに作成しており、定期的に内容を更新しています。旅行先の安全情報については外務省海外安全情報も合わせてご確認ください。
            </p>

            <div className="author-stats-grid">
              <div className="stat-box">
                <span className="stat-box-number">{totalPosts}</span>
                <span className="stat-box-label">公開記事数</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-number">60+</span>
                <span className="stat-box-label">渡航国・地域</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-number">2025</span>
                <span className="stat-box-label">創刊年</span>
              </div>
            </div>
          </div>

          {/* 専門分野 */}
          <div className="expertise-section">
            <h2 className="section-heading">専門分野・得意ジャンル</h2>
            <ul className="expertise-list">
              {[
                { icon: <MapPin size={14} />, text: '国内一人旅（全都道府県取材経験）' },
                { icon: <Globe size={14} />, text: '海外バックパッカー旅行（アジア・ヨーロッパ中心）' },
                { icon: <FileText size={14} />, text: '女性一人旅の安全対策・宿選び' },
                { icon: <MapPin size={14} />, text: '格安旅行・LCC活用術' },
                { icon: <Globe size={14} />, text: '旅行保険・eSIM・クレジットカード比較' },
                { icon: <FileText size={14} />, text: '旅行計画テンプレート・チェックリスト作成' },
              ].map((item, i) => (
                <li key={i} className="expertise-item">
                  <span className="expertise-icon">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* 編集ポリシー */}
          <div className="policy-section">
            <h2>📋 編集ポリシー・信頼性への取り組み</h2>
            <p>
              当メディアの記事は、実際の旅行経験・現地情報・公式サイトの情報をもとに作成しています。
              アフィリエイトリンクを含む場合は記事内に明記しています。
              情報は定期的に見直しを行っていますが、旅行前には必ず最新の公式情報をご確認ください。
              ご意見・訂正依頼は<Link href="/contact/">お問い合わせフォーム</Link>よりお気軽にどうぞ。
            </p>
          </div>

          {/* 最近の記事 */}
          <div className="recent-articles-section">
            <h2 className="section-heading">最近の記事</h2>
            <ul className="article-list">
              {recentPosts.map(post => (
                <li key={post.slug} className="article-list-item">
                  <Link href={`/posts/${post.slug}/`} className="article-list-link">
                    <span className="article-list-title">{post.title}</span>
                    <span className="article-list-meta">
                      {new Date(post.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Link href="/posts/" style={{ color: '#00d084', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                すべての記事を見る →
              </Link>
            </div>
          </div>

        </main>
        <Footer />
      </div>
    </>
  );
}

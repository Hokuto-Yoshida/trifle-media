import Link from 'next/link';
import { Plane, Twitter, Instagram, Youtube, Mail, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';
import type { Category } from '@/types/category';

const footerStyles = `
  .footer-container {
    background-color: #f9fafb;
    border-top: 1px solid #e5e7eb;
  }
  
  .footer-inner {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  .footer-main {
    padding: 48px 0 64px;
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  @media (min-width: 768px) {
    .footer-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 48px;
    }
  }
  
  @media (min-width: 1024px) {
    .footer-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .footer-brand {
    grid-column: span 1;
  }
  
  @media (min-width: 1024px) {
    .footer-brand {
      grid-column: span 1;
    }
  }
  
  .brand-link {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
    text-decoration: none;
    color: inherit;
  }
  
  .brand-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #10b981, #059669);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .brand-text {
    font-weight: bold;
    font-size: 1.25rem;
    color: #10b981;
  }
  
  .brand-description {
    color: #6b7280;
    margin-bottom: 24px;
    line-height: 1.6;
  }
  
  .social-links {
    display: flex;
    gap: 16px;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
    background-color: #e5e7eb;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    transition: all 0.2s;
    text-decoration: none;
  }
  
  .social-link:hover {
    background-color: #10b981;
    color: white;
  }
  
  .footer-section-title {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 24px;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-links li {
    margin-bottom: 12px;
  }
  
  .footer-link {
    color: #6b7280;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .footer-link:hover {
    color: #10b981;
  }
  
  .external-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  
  .app-cta-section {
    padding: 32px 0;
    border-top: 1px solid #e5e7eb;
  }
  
  .app-cta-container {
    background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
    border-radius: 12px;
    padding: 24px;
    text-align: center;
  }
  
  @media (min-width: 1024px) {
    .app-cta-container {
      padding: 32px;
    }
  }
  
  .app-cta-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    margin-bottom: 8px;
  }
  
  .app-cta-description {
    color: #dbeafe;
    margin-bottom: 24px;
    max-width: 512px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .app-cta-buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
  }
  
  @media (min-width: 640px) {
    .app-cta-buttons {
      flex-direction: row;
    }
  }
  
  .app-download-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: white;
    color: #10b981;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    transition: background-color 0.2s;
  }
  
  .app-download-button:hover {
    background-color: #f3f4f6;
  }
  
  .app-features-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 2px solid white;
    color: white;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s;
  }
  
  .app-features-button:hover {
    background-color: white;
    color: #10b981;
  }
  
  .newsletter-section {
    padding: 32px 0;
    border-top: 1px solid #e5e7eb;
    text-align: center;
  }
  
  .newsletter-header {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .newsletter-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
  }
  
  .newsletter-description {
    color: #6b7280;
    margin-bottom: 24px;
    max-width: 384px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 384px;
    margin: 0 auto;
  }
  
  @media (min-width: 640px) {
    .newsletter-form {
      flex-direction: row;
    }
  }
  
  .newsletter-input {
    flex: 1;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    outline: none;
    transition: all 0.2s;
  }
  
  .newsletter-input:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  .newsletter-button {
    background-color: #10b981;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    white-space: nowrap;
  }
  
  .newsletter-button:hover {
    background-color: #059669;
  }
  
  .newsletter-disclaimer {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 12px;
  }
  
  .copyright-section {
    padding: 24px 0;
    border-top: 1px solid #e5e7eb;
  }
  
  .copyright-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  @media (min-width: 768px) {
    .copyright-content {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  
  .copyright-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  @media (min-width: 640px) {
    .copyright-left {
      flex-direction: row;
    }
  }
  
  .tech-links {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .tech-link {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .tech-link:hover {
    color: #10b981;
  }
  
  .separator {
    color: #d1d5db;
  }
  
  .copyright-right {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 0.875rem;
    color: #9ca3af;
  }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/trifre_official/',
      icon: Instagram,
    },
  ];

  const quickLinks = [
    { name: 'ホーム', href: '/' },
    { name: '記事一覧', href: '/posts' },
    { name: 'アプリダウンロード', href: 'https://tripfriend-website.netlify.app', external: true },
  ];

  const supportLinks = [
    { name: 'お問い合わせ', href: '/contact' },
    { name: 'プライバシーポリシー', href: '/privacy' },
    { name: '利用規約', href: '/terms' },
    { name: 'サイトマップ', href: '/sitemap' },
    { name: '免責事項', href: '/disclaimer' },
  ];

  const featuredCategories = CATEGORIES.filter((cat: Category) => cat.featured).slice(0, 4);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: footerStyles }} />
      
      <footer className="footer-container">
        <div className="footer-inner">
          {/* メインフッターコンテンツ */}
          <div className="footer-main">
            <div className="footer-grid">
              
              {/* ブランド・概要 */}
              <div className="footer-brand">
                <Link href="/" className="brand-link">
                  <div className="brand-icon">
                    <Plane style={{ width: '20px', height: '20px', color: 'white' }} />
                  </div>
                  <span className="brand-text">
                    トリフレメディア
                  </span>
                </Link>
                
                <p className="brand-description">
                  若者のための一人旅特化メディア。初めての一人旅から海外ビギナー向けまで、安心・安全な旅の情報をお届けします。
                </p>
                
                {/* SNSリンク */}
                <div className="social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={social.name}
                    >
                      <social.icon style={{ width: '20px', height: '20px' }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* クイックリンク */}
              <div>
                <h3 className="footer-section-title">
                  クイックリンク
                </h3>
                <ul className="footer-links">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="footer-link"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link href={link.href} className="footer-link">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* カテゴリ */}
              <div>
                <h3 className="footer-section-title">
                  人気カテゴリ
                </h3>
                <ul className="footer-links">
                  {featuredCategories.map((category: Category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/category/${category.slug}`}
                        className="footer-link"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* サポート・法的情報 */}
              <div>
                <h3 className="footer-section-title">
                  サポート
                </h3>
                <ul className="footer-links">
                  {supportLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="footer-link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* アプリダウンロードCTA */}
          <div className="app-cta-section">
            <div className="app-cta-container">
              <h3 className="app-cta-title">
                📱 トリフレアプリ
              </h3>
              <p className="app-cta-description">
                一人旅をもっと楽しく、もっと安全に。トリフレアプリで旅行プランを立てて、同じ趣味の仲間と繋がろう。
              </p>
              <div className="app-cta-buttons">
                <a 
                  href="https://tripfriend-website.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="app-download-button"
                >
                  <span>📱</span>
                  アプリをダウンロード
                </a>
                <a 
                  href="https://tripfriend-website.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="app-features-button"
                >
                  機能を見る
                  <ExternalLink style={{ width: '16px', height: '16px' }} />
                </a>
              </div>
            </div>
          </div>

          {/* コピーライト */}
          <div className="copyright-section">
            <div className="copyright-content">
              <div className="copyright-left">
                <p>© {currentYear} トリフレメディア. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
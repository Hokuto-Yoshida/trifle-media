import { Metadata } from 'next';
import { Header, Footer } from '@/components';
import { AlertTriangle, ExternalLink, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: '免責事項 | トリフレメディア',
  description: 'トリフレメディアの免責事項について説明しています。',
};

const disclaimerStyles = `
  .disclaimer-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #fafafa;
  }

  .disclaimer-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    flex: 1;
  }

  .disclaimer-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .disclaimer-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 16px;
  }

  .disclaimer-updated {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 24px;
  }

  .disclaimer-intro {
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 40px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .disclaimer-intro-icon {
    color: #d68910;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .disclaimer-intro-text {
    font-size: 14px;
    line-height: 1.6;
    color: #856404;
  }

  .disclaimer-content {
    background: white;
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border: 1px solid #e5e7eb;
  }

  .disclaimer-section {
    margin-bottom: 40px;
  }

  .disclaimer-section:last-child {
    margin-bottom: 0;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 2px solid #00d084;
  }

  .section-content {
    line-height: 1.8;
    color: #374151;
  }

  .section-content p {
    margin-bottom: 16px;
  }

  .section-content ul {
    margin: 16px 0;
    padding-left: 24px;
  }

  .section-content li {
    margin-bottom: 8px;
  }

  .highlight-box {
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 6px;
    padding: 16px;
    margin: 20px 0;
  }

  .highlight-box .highlight-title {
    font-weight: 600;
    color: #0c4a6e;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .highlight-box .highlight-text {
    font-size: 14px;
    color: #075985;
    line-height: 1.6;
  }

  .external-link {
    color: #00d084;
    text-decoration: none;
    border-bottom: 1px dashed #00d084;
  }

  .external-link:hover {
    color: #059669;
    border-bottom-color: #059669;
  }

  @media (max-width: 768px) {
    .disclaimer-container {
      padding: 20px 16px;
    }

    .disclaimer-title {
      font-size: 2rem;
    }

    .disclaimer-content {
      padding: 24px;
    }

    .section-title {
      font-size: 1.25rem;
    }

    .disclaimer-intro {
      flex-direction: column;
      text-align: center;
    }
  }
`;

export default function DisclaimerPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: disclaimerStyles }} />
      
      <div className="disclaimer-page">
        <Header />
        
        <main className="disclaimer-container">
          <div className="disclaimer-header">
            <h1 className="disclaimer-title">免責事項</h1>
            <p className="disclaimer-updated">最終更新日: 2025年9月21日</p>
          </div>

          <div className="disclaimer-intro">
            <AlertTriangle size={20} className="disclaimer-intro-icon" />
            <div className="disclaimer-intro-text">
              トリフレメディア（以下「当サイト」）をご利用いただく前に、以下の免責事項を必ずお読みください。当サイトのご利用をもって、これらの条件にご同意いただいたものとみなします。
            </div>
          </div>

          <div className="disclaimer-content">
            <div className="disclaimer-section">
              <h2 className="section-title">1. 情報の正確性について</h2>
              <div className="section-content">
                <p>当サイトに掲載されている旅行情報、料金、営業時間、その他の情報については、可能な限り正確性を保つよう努めておりますが、以下の点にご注意ください：</p>
                <ul>
                  <li>掲載情報は予告なく変更される場合があります</li>
                  <li>情報の完全性や最新性を保証するものではありません</li>
                  <li>実際の旅行前には、必ず公式サイトや現地での確認をお願いします</li>
                  <li>当サイトの情報に基づく損害については、一切の責任を負いかねます</li>
                </ul>
                
                <div className="highlight-box">
                  <div className="highlight-title">
                    <Shield size={16} />
                    重要なお知らせ
                  </div>
                  <div className="highlight-text">
                    特に料金情報、営業時間、交通情報については変動が激しいため、旅行計画の際は必ず最新情報をご確認ください。
                  </div>
                </div>
              </div>
            </div>

            <div className="disclaimer-section">
              <h2 className="section-title">2. 外部リンクについて</h2>
              <div className="section-content">
                <p>当サイトには外部サイトへのリンクが含まれており、これらのリンク先については以下の通りです：</p>
                <ul>
                  <li>リンク先サイトの内容については、当サイトは一切の責任を負いません</li>
                  <li>リンク先での取引やサービス利用は、お客様の自己責任でお願いします</li>
                  <li>リンク先サイトの利用規約・プライバシーポリシーをご確認ください</li>
                  <li>リンク先サイトでの損害について、当サイトは責任を負いかねます</li>
                </ul>
              </div>
            </div>

            <div className="disclaimer-section">
              <h2 className="section-title">3. アフィリエイト広告について</h2>
              <div className="section-content">
                <p>当サイトでは、以下のアフィリエイトプログラムを利用しています：</p>
                <ul>
                  <li>楽天アフィリエイト</li>
                  <li>A8.net</li>
                  <li>その他ASP（アフィリエイト・サービス・プロバイダ）</li>
                </ul>
                <p>これらのプログラムを通じて、商品購入やサービス利用時に当サイトが収益を得る場合があります。ただし、これによって利用者に追加費用が発生することはありません。</p>
                
                <div className="highlight-box">
                  <div className="highlight-title">
                    <ExternalLink size={16} />
                    アフィリエイトについて
                  </div>
                  <div className="highlight-text">
                    アフィリエイト収益は当サイトの運営費用に充当し、より良いコンテンツ提供のために活用させていただいています。
                  </div>
                </div>
              </div>
            </div>

            <div className="disclaimer-section">
              <h2 className="section-title">4. 旅行の安全性について</h2>
              <div className="section-content">
                <p>一人旅には特有のリスクが伴います。以下の点にご注意ください：</p>
                <ul>
                  <li>旅行先の治安情報を事前に確認してください</li>
                  <li>外務省の渡航情報をチェックしてください</li>
                  <li>適切な旅行保険への加入をお勧めします</li>
                  <li>緊急時の連絡先を準備してください</li>
                  <li>当サイトは旅行中の事故や損害に対して責任を負いません</li>
                </ul>
              </div>
            </div>

            <div className="disclaimer-section">
              <h2 className="section-title">5. 著作権について</h2>
              <div className="section-content">
                <p>当サイトのコンテンツ（文章、画像、デザインなど）の著作権は、トリフレメディアまたは正当な権利者に帰属します：</p>
                <ul>
                  <li>無断転載、複製、改変は禁止します</li>
                  <li>個人的な利用の範囲を超える使用はお控えください</li>
                  <li>引用する場合は、適切な出典表示をお願いします</li>
                </ul>
              </div>
            </div>

            <div className="disclaimer-section">
              <h2 className="section-title">6. 免責事項の変更</h2>
              <div className="section-content">
                <p>当サイトは、法令の変更やサービス内容の変更に伴い、本免責事項を予告なく変更する場合があります。変更後の免責事項は、当サイトに掲載した時点で効力を生じるものとします。</p>
              </div>
            </div>

            <div className="disclaimer-section">
              <h2 className="section-title">7. お問い合わせ</h2>
              <div className="section-content">
                <p>本免責事項に関するご質問やご不明な点がございましたら、<a href="/contact" className="external-link">お問い合わせページ</a>よりご連絡ください。</p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
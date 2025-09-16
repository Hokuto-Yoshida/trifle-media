import Link from 'next/link';
import { Metadata } from 'next';
import { Header, Footer } from '@/components';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | トリフレメディア',
  description: 'トリフレメディアのプライバシーポリシーをご確認ください。',
};

const styles = `
  .legal-page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f9fafb;
  }
  
  .legal-main {
    flex: 1;
    padding: 80px 0;
  }
  
  .container {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  .legal-container {
    max-width: 896px;
    margin: 0 auto;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 48px;
  }
  
  .page-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 16px;
    line-height: 1.2;
  }
  
  .page-description {
    font-size: 1.125rem;
    color: #6b7280;
    line-height: 1.6;
  }
  
  .legal-content {
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 48px;
    line-height: 1.8;
  }
  
  @media (max-width: 768px) {
    .legal-content {
      padding: 32px 24px;
    }
  }
  
  .update-date {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .update-badge {
    display: inline-block;
    font-size: 0.875rem;
    color: #6b7280;
    background-color: #f9fafb;
    padding: 8px 16px;
    border-radius: 9999px;
  }
  
  .intro-section {
    margin-bottom: 32px;
    padding: 24px;
    background-color: rgba(16, 185, 129, 0.05);
    border-left: 4px solid #10b981;
    border-radius: 0 8px 8px 0;
  }
  
  .intro-text {
    color: #374151;
    margin: 0;
  }
  
  .legal-section {
    margin-bottom: 32px;
  }
  
  .section-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #10b981;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid rgba(16, 185, 129, 0.2);
  }
  
  .section-content {
    color: #374151;
  }
  
  .section-content p {
    margin-bottom: 16px;
  }
  
  .section-content ul {
    list-style-type: disc;
    padding-left: 24px;
    margin-bottom: 16px;
  }
  
  .section-content ol {
    list-style-type: decimal;
    padding-left: 24px;
    margin-bottom: 16px;
  }
  
  .section-content li {
    margin-bottom: 8px;
  }
  
  .info-card {
    padding: 16px;
    border-radius: 8px;
    margin: 24px 0;
  }
  
  .info-card-blue {
    background-color: #dbeafe;
  }
  
  .info-card-green {
    background-color: #d1fae5;
  }
  
  .info-card-purple {
    background-color: #e9d5ff;
  }
  
  .info-card-orange {
    background-color: #fed7aa;
  }
  
  .info-card-yellow {
    background-color: #fef3c7;
    border: 1px solid #f59e0b;
  }
  
  .info-card-title {
    font-weight: 600;
    color: #10b981;
    margin-bottom: 8px;
  }
  
  .info-card ul {
    list-style-type: disc;
    padding-left: 16px;
    margin: 8px 0;
  }
  
  .info-card li {
    margin-bottom: 4px;
  }
  
  .info-note {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 8px;
  }
  
  .contact-section {
    background-color: #f9fafb;
    padding: 24px;
    border-radius: 12px;
    margin-top: 32px;
  }
  
  .contact-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 16px;
  }
  
  .contact-content {
    color: #374151;
  }
  
  .contact-content p {
    margin-bottom: 8px;
  }
  
  .legal-link {
    color: #10b981;
    text-decoration: underline;
    transition: color 0.2s;
  }
  
  .legal-link:hover {
    color: #059669;
  }
`;

export default function PrivacyPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="legal-page-container">
        <Header />
        
        <main className="legal-main">
          <div className="container">
            <div className="legal-container">
              
              {/* ページタイトル */}
              <div className="page-header">
                <h1 className="page-title">プライバシーポリシー</h1>
                <p className="page-description">個人情報の取り扱いについて</p>
              </div>

              {/* 法的文書コンテンツ */}
              <div className="legal-content">
                
                {/* 最終更新日 */}
                <div className="update-date">
                  <span className="update-badge">
                    最終更新日: 2025年9月15日
                  </span>
                </div>

                {/* イントロ */}
                <div className="intro-section">
                  <p className="intro-text">
                    株式会社Riorno（以下「当社」）は、トリフレメディアをご利用いただくお客様の個人情報保護を重要視し、以下のプライバシーポリシーに従って適切に取り扱います。
                  </p>
                </div>

                {/* 1. 収集する情報 */}
                <section className="legal-section">
                  <h2 className="section-title">1. 収集する情報</h2>
                  <div className="section-content">
                    <p>当社は以下の情報を収集します：</p>
                    
                    <div className="info-card info-card-blue">
                      <h3 className="info-card-title">【基本情報】</h3>
                      <ul>
                        <li>お名前、メールアドレス</li>
                        <li>年齢、性別（任意）</li>
                        <li>お住まいの地域（任意）</li>
                        <li>お問い合わせ内容</li>
                      </ul>
                    </div>

                    <div className="info-card info-card-green">
                      <h3 className="info-card-title">【利用情報】</h3>
                      <ul>
                        <li>サイト閲覧履歴、アクセス状況</li>
                        <li>閲覧した記事・コンテンツ</li>
                        <li>検索キーワード、検索履歴</li>
                        <li>クリックした広告・リンク</li>
                        <li>滞在時間、離脱ページ</li>
                      </ul>
                    </div>

                    <div className="info-card info-card-purple">
                      <h3 className="info-card-title">【技術情報】</h3>
                      <ul>
                        <li>IPアドレス、ユーザーエージェント</li>
                        <li>ブラウザ種類・バージョン</li>
                        <li>デバイス情報（OS、画面サイズ等）</li>
                        <li>リファラー（参照元サイト）</li>
                        <li>Cookie情報</li>
                      </ul>
                    </div>

                    <div className="info-card info-card-orange">
                      <h3 className="info-card-title">【コミュニケーション情報】</h3>
                      <ul>
                        <li>コメント投稿内容</li>
                        <li>お問い合わせ・フィードバック内容</li>
                        <li>メールマガジン配信履歴</li>
                        <li>SNSからの公開情報（連携時のみ）</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 2. 情報の利用目的 */}
                <section className="legal-section">
                  <h2 className="section-title">2. 情報の利用目的</h2>
                  <div className="section-content">
                    <p>収集した情報は以下の目的で利用します：</p>
                    <ol>
                      <li>メディアサービスの提供・運営</li>
                      <li>コンテンツの配信・パーソナライズ</li>
                      <li>広告の表示・配信・効果測定</li>
                      <li>アクセス解析・利用状況分析</li>
                      <li>お問い合わせ・カスタマーサポート対応</li>
                      <li>メールマガジン・お知らせの配信</li>
                      <li>サービス改善・新機能開発</li>
                      <li>不正利用・セキュリティ対策</li>
                      <li>法令遵守・法的義務の履行</li>
                      <li>マーケティング・プロモーション活動</li>
                    </ol>
                  </div>
                </section>

                {/* 3. 情報の共有・開示 */}
                <section className="legal-section">
                  <h2 className="section-title">3. 情報の共有・開示</h2>
                  <div className="section-content">
                    <p>当社は以下の場合を除き、個人情報を第三者に提供しません：</p>
                    <ol>
                      <li>ユーザーの明示的な同意がある場合</li>
                      <li>法令に基づく開示義務がある場合</li>
                      <li>人の生命・身体・財産の保護に必要な場合</li>
                      <li>サービス提供に必要な範囲での委託先への提供</li>
                    </ol>

                    <div className="info-card info-card-yellow">
                      <h3 className="info-card-title">【第三者サービスとの情報共有】</h3>
                      <p>以下のサービスと必要な範囲で情報を共有する場合があります：</p>
                      <ul>
                        <li>Google Analytics（アクセス解析）</li>
                        <li>Google AdSense（広告配信）</li>
                        <li>Amazonアソシエイト（アフィリエイト）</li>
                        <li>SNS連携サービス（Facebook、Twitter等）</li>
                        <li>メール配信サービス</li>
                        <li>その他広告配信・アフィリエイトサービス</li>
                      </ul>
                      <p className="info-note">※各サービスのプライバシーポリシーもご確認ください</p>
                    </div>
                  </div>
                </section>

                {/* 4. Cookie・トラッキング技術 */}
                <section className="legal-section">
                  <h2 className="section-title">4. Cookie・トラッキング技術</h2>
                  <div className="section-content">
                    <p>当社サイトでは以下の技術を使用しています：</p>
                    <ol>
                      <li>Cookie（ユーザー設定の保存、サイト利用状況の分析）</li>
                      <li>Google Analytics（アクセス解析・レポート作成）</li>
                      <li>広告配信ネットワークのトラッキング（興味関心ベース広告）</li>
                      <li>SNSプラグイン（シェアボタン、いいねボタン等）</li>
                    </ol>
                    <p>ブラウザ設定でCookieを無効にできますが、一部機能が制限される場合があります。</p>
                  </div>
                </section>

                {/* 5. データの保管・セキュリティ */}
                <section className="legal-section">
                  <h2 className="section-title">5. データの保管・セキュリティ</h2>
                  <div className="section-content">
                    <ol>
                      <li>個人情報は適切な技術的・組織的セキュリティ対策を講じて保管します</li>
                      <li>データ通信・保存時の暗号化により情報を保護します</li>
                      <li>アクセス権限は業務上必要な範囲に制限されます</li>
                      <li>定期的なセキュリティ監査・脆弱性検査を実施します</li>
                      <li>サーバーは信頼できるクラウドサービスで厳重に管理されます</li>
                    </ol>
                  </div>
                </section>

                {/* 6. データの保存期間 */}
                <section className="legal-section">
                  <h2 className="section-title">6. データの保存期間</h2>
                  <div className="section-content">
                    <ul>
                      <li>お問い合わせ情報：対応完了から3年間</li>
                      <li>アクセスログ：取得から1年間</li>
                      <li>コメント投稿：投稿から5年間（削除依頼があれば即座に削除）</li>
                      <li>メールマガジン登録情報：配信停止まで</li>
                      <li>Cookie情報：ブラウザの設定に従う</li>
                      <li>法的義務により長期保存が必要な場合はその期間</li>
                    </ul>
                  </div>
                </section>

                {/* 7. ユーザーの権利 */}
                <section className="legal-section">
                  <h2 className="section-title">7. ユーザーの権利</h2>
                  <div className="section-content">
                    <p>ユーザーは以下の権利を有します：</p>
                    <ol>
                      <li>個人情報の開示請求</li>
                      <li>個人情報の訂正・更新請求</li>
                      <li>個人情報の削除請求</li>
                      <li>処理の停止請求</li>
                      <li>データポータビリティの権利</li>
                      <li>メールマガジンの配信停止</li>
                      <li>コメント投稿の削除依頼</li>
                    </ol>
                    <p>これらの権利行使については、<Link href="/contact" className="legal-link">お問い合わせフォーム</Link>からご連絡ください。</p>
                  </div>
                </section>

                {/* 8. 広告・アフィリエイト関連 */}
                <section className="legal-section">
                  <h2 className="section-title">8. 広告・アフィリエイト関連</h2>
                  <div className="section-content">
                    <p>当社は以下の広告・アフィリエイトサービスを利用しています：</p>
                    <ul>
                      <li>Google AdSense（興味関心ベース広告）</li>
                      <li>Amazonアソシエイト（商品紹介プログラム）</li>
                      <li>楽天アフィリエイト</li>
                      <li>じゃらんアフィリエイト</li>
                      <li>その他旅行関連サービスのアフィリエイト</li>
                    </ul>
                    <p>これらのサービスは独自のプライバシーポリシーに基づいて運営されており、Cookie等を使用してユーザーの行動情報を収集する場合があります。</p>
                    <p>詳細は各サービスのプライバシーポリシーをご確認ください。</p>
                  </div>
                </section>

                {/* 9. 国際的なデータ転送 */}
                <section className="legal-section">
                  <h2 className="section-title">9. 国際的なデータ転送</h2>
                  <div className="section-content">
                    <p>サービス提供のため、個人情報を日本国外（主に米国のクラウドサービス）に転送する場合があります。</p>
                    <p>その際は、適切なデータ保護水準を確保し、必要な法的保護措置を講じます。</p>
                  </div>
                </section>

                {/* 10. 未成年者の保護 */}
                <section className="legal-section">
                  <h2 className="section-title">10. 未成年者の保護</h2>
                  <div className="section-content">
                    <p>13歳未満の方からは個人情報を収集しません。</p>
                    <p>13歳以上18歳未満の方は、法定代理人の同意を得た上でご利用ください。</p>
                    <p>未成年者からの不適切な情報収集が判明した場合は、速やかに削除いたします。</p>
                  </div>
                </section>

                {/* 11. ポリシーの変更 */}
                <section className="legal-section">
                  <h2 className="section-title">11. ポリシーの変更</h2>
                  <div className="section-content">
                    <p>本ポリシーは法令の変更やサービス改善のため、事前通知により変更する場合があります。</p>
                    <p>重要な変更については、サイト上でのお知らせ・メール等でお知らせいたします。</p>
                    <p>変更後も継続してサービスをご利用いただく場合、変更に同意したものとみなします。</p>
                  </div>
                </section>

                {/* 連絡先 */}
                <section className="contact-section">
                  <h2 className="contact-title">お問い合わせ</h2>
                  <div className="contact-content">
                    <p><strong>株式会社Riorno</strong></p>
                    <p><strong>個人情報保護責任者: トリフレメディア運営事務局</strong></p>
                    <p>お問い合わせ: <Link href="/contact" className="legal-link">こちらのフォームから</Link></p>
                    <p>営業時間: 平日 10:00-17:00</p>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
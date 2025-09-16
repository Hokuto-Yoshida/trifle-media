import Link from 'next/link';
import { Metadata } from 'next';
import { Header, Footer } from '@/components';

export const metadata: Metadata = {
  title: '利用規約 | トリフレメディア',
  description: 'トリフレメディアの利用規約をご確認ください。',
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

export default function TermsPage() {
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
                <h1 className="page-title">利用規約</h1>
                <p className="page-description">トリフレメディアのサービス利用に関する規約</p>
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
                    トリフレメディアをご利用いただき、ありがとうございます。本利用規約は、お客様と株式会社Riornoとの間のメディアサービス利用に関する契約です。
                  </p>
                </div>

                {/* 第1条 */}
                <section className="legal-section">
                  <h2 className="section-title">第1条（定義）</h2>
                  <div className="section-content">
                    <p>1. 「本サービス」とは、株式会社Riornoが運営するトリフレメディア（Webサイト及び関連サービス）をいいます。</p>
                    <p>2. 「ユーザー」とは、本サービスを利用する個人をいいます。</p>
                    <p>3. 「コンテンツ」とは、本サービス上で提供される記事、画像、動画等の情報をいいます。</p>
                    <p>4. 「当社」とは、株式会社Riornoをいいます。</p>
                  </div>
                </section>

                {/* 第2条 */}
                <section className="legal-section">
                  <h2 className="section-title">第2条（サービス内容）</h2>
                  <div className="section-content">
                    <p>本サービスは、以下の機能を提供します：</p>
                    <ul>
                      <li>旅行関連情報・記事の配信</li>
                      <li>旅行ガイド・体験談の提供</li>
                      <li>観光地・宿泊施設の紹介</li>
                      <li>旅行に関するニュース・トレンド情報</li>
                      <li>コメント・フィードバック機能</li>
                      <li>メールマガジン配信</li>
                      <li>その他当社が提供する機能</li>
                    </ul>
                  </div>
                </section>

                {/* 第3条 */}
                <section className="legal-section">
                  <h2 className="section-title">第3条（利用資格）</h2>
                  <div className="section-content">
                    <p>1. 本サービスは13歳以上の方にご利用いただけます。</p>
                    <p>2. 未成年者は法定代理人の同意を得た上でご利用ください。</p>
                    <p>3. 以下に該当する方は本サービスをご利用いただけません：</p>
                    <ul>
                      <li>過去に本規約違反により利用停止処分を受けた方</li>
                      <li>反社会的勢力に属する方</li>
                      <li>その他当社が不適切と判断した方</li>
                    </ul>
                  </div>
                </section>

                {/* 第4条 */}
                <section className="legal-section">
                  <h2 className="section-title">第4条（禁止行為）</h2>
                  <div className="section-content">
                    <p>ユーザーは以下の行為を行ってはなりません：</p>
                    <ul>
                      <li>虚偽の情報の提供</li>
                      <li>他のユーザーへの迷惑行為、嫌がらせ</li>
                      <li>スパム行為・過度な宣伝活動</li>
                      <li>著作権等の知的財産権の侵害</li>
                      <li>本サービスの運営を妨害する行為</li>
                      <li>システムの不正利用・ハッキング</li>
                      <li>法令に違反する行為</li>
                      <li>公序良俗に反する行為</li>
                      <li>その他当社が不適切と判断する行為</li>
                    </ul>
                  </div>
                </section>

                {/* 第5条 */}
                <section className="legal-section">
                  <h2 className="section-title">第5条（コンテンツの利用）</h2>
                  <div className="section-content">
                    <p>1. 本サービス上のコンテンツの著作権は当社または第三者に帰属します。</p>
                    <p>2. ユーザーは個人的な利用の範囲で本サービスのコンテンツを利用できます。</p>
                    <p>3. 以下の行為は禁止します：</p>
                    <ul>
                      <li>商用利用・営利目的での利用</li>
                      <li>無断での複製・転載・配布</li>
                      <li>改変・編集・二次創作</li>
                      <li>他のサイトやアプリへの転載</li>
                    </ul>
                  </div>
                </section>

                {/* 第6条 */}
                <section className="legal-section">
                  <h2 className="section-title">第6条（広告・アフィリエイト）</h2>
                  <div className="section-content">
                    <p>1. 本サービスでは広告及びアフィリエイトリンクを掲載しています。</p>
                    <p>2. 広告主やアフィリエイト先の商品・サービスに関する責任は、それぞれの提供者が負います。</p>
                    <p>3. 広告経由での購入・契約については、ユーザーと広告主間での取引となります。</p>
                    <p>4. 当社は広告内容や取引結果について一切の責任を負いません。</p>
                  </div>
                </section>

                {/* 第7条 */}
                <section className="legal-section">
                  <h2 className="section-title">第7条（ユーザー投稿コンテンツ）</h2>
                  <div className="section-content">
                    <p>1. ユーザーがコメント等で投稿したコンテンツの責任はユーザーが負います。</p>
                    <p>2. 投稿コンテンツについて、当社は以下の権利を有します：</p>
                    <ul>
                      <li>本サービス内での利用・表示</li>
                      <li>不適切な内容の削除・編集</li>
                      <li>宣伝・マーケティング目的での利用</li>
                    </ul>
                    <p>3. 投稿時点で、ユーザーは上記利用について同意したものとみなします。</p>
                  </div>
                </section>

                {/* 第8条 */}
                <section className="legal-section">
                  <h2 className="section-title">第8条（プライバシー・個人情報）</h2>
                  <div className="section-content">
                    <p>個人情報の取り扱いについては、別途定める<Link href="/privacy" className="legal-link">プライバシーポリシー</Link>をご確認ください。</p>
                  </div>
                </section>

                {/* 第9条 */}
                <section className="legal-section">
                  <h2 className="section-title">第9条（免責事項）</h2>
                  <div className="section-content">
                    <p>1. 当社は本サービスの完全性、正確性、安全性を保証するものではありません。</p>
                    <p>2. 本サービスの情報に基づく判断・行動によって生じた損害について当社は責任を負いません。</p>
                    <p>3. 外部リンク先のサイトについて当社は責任を負いません。</p>
                    <p>4. サービスの中断、停止による損害について当社は責任を負いません。</p>
                    <p>5. 広告主やアフィリエイト先との取引について当社は責任を負いません。</p>
                  </div>
                </section>

                {/* 第10条 */}
                <section className="legal-section">
                  <h2 className="section-title">第10条（サービス変更・終了）</h2>
                  <div className="section-content">
                    <p>当社は事前通知により、本サービスの内容変更、一時停止、終了を行うことができます。これによる損害について当社は責任を負いません。</p>
                  </div>
                </section>

                {/* 第11条 */}
                <section className="legal-section">
                  <h2 className="section-title">第11条（準拠法・管轄裁判所）</h2>
                  <div className="section-content">
                    <p>本規約は日本法に準拠し、福岡地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
                  </div>
                </section>

                {/* 連絡先 */}
                <section className="contact-section">
                  <h2 className="contact-title">お問い合わせ</h2>
                  <div className="contact-content">
                    <p><strong>株式会社Riorno</strong></p>
                    <p><strong>トリフレメディア運営事務局</strong></p>
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
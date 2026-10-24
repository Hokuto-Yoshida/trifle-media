import Script from 'next/script';

// ページ遷移(クライアント側ナビゲーション)は GA4 の拡張計測(ブラウザの履歴イベント)で自動計測される。
// page_path を固定すると初回表示のパスが全ページビューに使われてしまうため指定しない。
export function Analytics() {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
        }}
      />
    </>
  );
}

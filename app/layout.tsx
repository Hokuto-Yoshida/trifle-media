import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider, Analytics } from '@/components';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'トリフレメディア - Z世代のための一人旅特化メディア',
    template: '%s | トリフレメディア',
  },
  description: 'Z世代のための一人旅特化メディア「トリフレ」。初めての一人旅から海外ビギナー向けまで、安心・安全な旅の情報をお届けします。',
  keywords: ['一人旅', 'Z世代', '旅行', '国内旅行', '海外旅行', 'トリフレ', '若者', '初心者'],
  authors: [{ name: 'トリフレメディア編集部' }],
  creator: 'トリフレメディア',
  publisher: 'トリフレメディア',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://media.trifle.jp',
    siteName: 'トリフレメディア',
    title: 'トリフレメディア - Z世代のための一人旅特化メディア',
    description: 'Z世代のための一人旅特化メディア「トリフレ」。初めての一人旅から海外ビギナー向けまで、安心・安全な旅の情報をお届けします。',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'トリフレメディア',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@trifle_media',
    creator: '@trifle_media',
    title: 'トリフレメディア - Z世代のための一人旅特化メディア',
    description: 'Z世代のための一人旅特化メディア「トリフレ」。初めての一人旅から海外ビギナー向けまで、安心・安全な旅の情報をお届けします。',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: 'https://media.trifle.jp',
    types: {
      'application/rss+xml': [
        {
          url: 'https://media.trifle.jp/feed.xml',
          title: 'トリフレメディア RSS Feed',
        },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.variable,
        notoSansJP.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
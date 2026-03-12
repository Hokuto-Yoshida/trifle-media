import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'source.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      // スクリプト: Next.js inline scripts(JSON-LD等) + Google系サービス
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://adservice.google.com",
      // スタイル: inline styles(dangerouslySetInnerHTML) + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // フォント: Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // 画像: self + Unsplash + Google系 + data URI
      "img-src 'self' data: https: blob:",
      // 通信: Google Analytics
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
      // iframe: AdSense
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);

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
  // セキュリティヘッダーは静的書き出しでは headers() が効かないため netlify.toml で設定している
};

export default withMDX(nextConfig);

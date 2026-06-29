import type { Metadata } from 'next';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://torifure.com').replace(/\/$/, '');

export const metadata: Metadata = {
  title: '記事一覧',
  description: '国内・海外の一人旅ガイドを320記事以上掲載。旅先選びから現地の過ごし方まで、一人旅に特化した情報をお届けします。',
  alternates: {
    canonical: `${siteUrl}/posts/`,
  },
  openGraph: {
    title: '記事一覧 | トリフレメディア',
    description: '国内・海外の一人旅ガイドを320記事以上掲載。旅先選びから現地の過ごし方まで、一人旅に特化した情報をお届けします。',
    url: `${siteUrl}/posts/`,
    type: 'website',
  },
};

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

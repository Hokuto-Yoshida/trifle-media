import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostsList, { getTotalPages } from '../../PostsList';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://torifure.com').replace(/\/$/, '');

interface Props {
  params: { page: string };
}

// 1ページ目は /posts/ で配信するため、ここでは2ページ目以降のみ生成する
export async function generateStaticParams() {
  const totalPages = await getTotalPages();
  return Array.from({ length: totalPages - 1 }, (_, i) => ({ page: String(i + 2) }));
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    // posts/layout.tsx の title が文字列のため、配下ではルートの title.template が効かない
    title: { absolute: `記事一覧（${params.page}ページ目） | トリフレメディア` },
    alternates: {
      canonical: `${siteUrl}/posts/page/${params.page}/`,
    },
    openGraph: {
      title: `記事一覧（${params.page}ページ目） | トリフレメディア`,
      url: `${siteUrl}/posts/page/${params.page}/`,
      type: 'website',
    },
  };
}

export default async function PostsPaginatedPage({ params }: Props) {
  const page = Number(params.page);
  if (!Number.isInteger(page) || page < 2 || page > await getTotalPages()) {
    notFound();
  }
  return <PostsList page={page} />;
}

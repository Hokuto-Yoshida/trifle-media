import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header, Footer } from '@/components';
import { getAllTags, getPostsByTag } from '@/lib/posts';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://torifure.com').replace(/\/$/, '');

interface TagPageProps {
  params: { tag: string };
}

export async function generateStaticParams() {
  const { getAllPosts } = await import('@/lib/posts');
  const allPosts = await getAllPosts();

  const freq: Record<string, number> = {};
  allPosts.forEach(p => p.tags.forEach(t => { freq[t] = (freq[t] || 0) + 1; }));

  const topTags = Object.entries(freq)
    .filter(([, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 200)
    .map(([tag]) => tag);

  return topTags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(tag);
  if (posts.length === 0) return { title: 'タグが見つかりません | トリフレメディア' };

  return {
    title: `「${tag}」の記事一覧 | トリフレメディア`,
    description: `「${tag}」に関連する一人旅記事を${posts.length}件掲載しています。`,
    alternates: { canonical: `${siteUrl}/tags/${encodeURIComponent(tag)}/` },
    openGraph: {
      title: `「${tag}」の記事一覧 | トリフレメディア`,
      description: `「${tag}」に関連する一人旅記事を${posts.length}件掲載しています。`,
      url: `${siteUrl}/tags/${encodeURIComponent(tag)}/`,
      type: 'website',
      images: [{ url: `${siteUrl}/opengraph-image.png`, width: 1200, height: 630, alt: 'トリフレメディア' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `「${tag}」の記事一覧 | トリフレメディア`,
      description: `「${tag}」に関連する一人旅記事を${posts.length}件掲載しています。`,
      images: [`${siteUrl}/opengraph-image.png`],
    },
  };
}

const tagPageStyles = `
  .tag-page { min-height: 100vh; display: flex; flex-direction: column; background: white; }
  .tag-container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; flex: 1; }
  .tag-header { margin-bottom: 40px; border-bottom: 2px solid #e5e7eb; padding-bottom: 24px; }
  .tag-label { display: inline-block; background: #00d084; color: white; padding: 6px 14px; font-size: 14px; font-weight: 600; border-radius: 4px; margin-bottom: 12px; }
  .tag-title { font-size: 1.75rem; font-weight: 700; color: #1f2937; margin-bottom: 8px; }
  .tag-count { font-size: 14px; color: #6b7280; }
  .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
  .post-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; text-decoration: none; color: inherit; transition: all 0.2s ease; display: flex; flex-direction: column; }
  .post-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); transform: translateY(-2px); }
  .post-thumb { width: 100%; height: 180px; object-fit: cover; background: #f3f4f6; }
  .post-body { padding: 16px; flex: 1; display: flex; flex-direction: column; }
  .post-category { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 2px 8px; font-size: 11px; font-weight: 600; border-radius: 4px; margin-bottom: 8px; }
  .post-title { font-size: 1rem; font-weight: 600; line-height: 1.4; color: #1f2937; margin-bottom: 8px; flex: 1; }
  .post-meta { font-size: 12px; color: #9ca3af; }
  .breadcrumb { display: flex; gap: 8px; align-items: center; font-size: 13px; color: #9ca3af; margin-bottom: 24px; }
  .breadcrumb a { color: #00d084; text-decoration: none; }
  .breadcrumb a:hover { text-decoration: underline; }
  @media (max-width: 640px) { .posts-grid { grid-template-columns: 1fr; } .tag-title { font-size: 1.4rem; } }
`;

export default async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `「${tag}」の記事一覧`,
    description: `「${tag}」に関連する一人旅記事`,
    url: `${siteUrl}/tags/${encodeURIComponent(tag)}/`,
    numberOfItems: posts.length,
    itemListElement: posts.slice(0, 30).map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}/posts/${post.slug}/`,
      name: post.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style dangerouslySetInnerHTML={{ __html: tagPageStyles }} />
      <div className="tag-page">
        <Header />
        <div className="tag-container">
          <nav className="breadcrumb">
            <Link href="/">ホーム</Link>
            <span>/</span>
            <span>タグ</span>
            <span>/</span>
            <span style={{ color: '#1f2937' }}>{tag}</span>
          </nav>

          <div className="tag-header">
            <span className="tag-label"># {tag}</span>
            <h1 className="tag-title">「{tag}」の記事一覧</h1>
            <p className="tag-count">{posts.length}件の記事があります</p>
          </div>

          <div className="posts-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="post-card">
                <img src={post.thumb || '/images/default-thumb.jpg'} alt={post.title} className="post-thumb" width="800" height="450" loading="lazy" />
                <div className="post-body">
                  <span className="post-category">{post.category}</span>
                  <h2 className="post-title">{post.title}</h2>
                  <div className="post-meta">{new Date(post.date).toLocaleDateString('ja-JP')} · {post.readingTime}分</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

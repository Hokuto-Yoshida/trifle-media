import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, Share2, Heart, Bookmark, ChevronRight, ExternalLink } from 'lucide-react';
import { Header, Footer, PostCard } from '@/components';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/posts';
import { formatDate, formatReadingTime, generateShareUrls } from '@/lib/utils';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      return {
        title: '記事が見つかりません | トリフレメディア',
      };
    }

    return {
      title: post.seo?.title || `${post.title} | トリフレメディア`,
      description: post.seo?.description || post.description,
      keywords: post.seo?.keywords || post.tags,
      openGraph: {
        title: post.title,
        description: post.description,
        images: [{ url: post.thumb }],
        type: 'article',
        publishedTime: post.date,
        authors: [post.author.name],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [post.thumb],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: '記事が見つかりません | トリフレメディア',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  let post;
  let relatedPosts;

  try {
    post = await getPostBySlug(params.slug);
    if (!post) {
      notFound();
    }

    relatedPosts = await getRelatedPosts(post.slug, post.category, 3);
  } catch (error) {
    console.error('Error loading post:', error);
    notFound();
  }

  const shareUrls = generateShareUrls(
    `https://media.trifle.jp/posts/${post.slug}`,
    post.title
  );

  const affiliateProducts = post.affiliate?.products || [];
  const affiliateHotels = post.affiliate?.hotels || [];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      
      <main className="flex-1">
        {/* パンくずナビ */}
        <nav className="bg-gray-50 dark:bg-gray-800 py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-primary-600 transition-colors">
                  ホーム
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li>
                <Link href="/posts" className="text-gray-500 hover:text-primary-600 transition-colors">
                  記事一覧
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li>
                <Link href={`/category/${post.category.toLowerCase()}`} className="text-gray-500 hover:text-primary-600 transition-colors">
                  {post.category}
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li className="text-gray-900 dark:text-gray-100 font-medium truncate">
                {post.title}
              </li>
            </ol>
          </div>
        </nav>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 記事ヘッダー */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {post.description}
            </p>
            
            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {formatReadingTime(post.readingTime)}
              </div>
              <div className="flex items-center gap-2">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span>{post.author.name}</span>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex items-center gap-4 mb-8">
              <button className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <Heart className="w-4 h-4" />
                いいね
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <Bookmark className="w-4 h-4" />
                保存
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">シェア:</span>
                <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href={shareUrls.line} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                </a>
              </div>
            </div>
          </header>

          {/* アイキャッチ画像 */}
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <Image
              src={post.thumb}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 記事本文 */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary-500 prose-blockquote:bg-primary-50 dark:prose-blockquote:bg-primary-900/20 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
            {/* MDXコンテンツがここに入る */}
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
          </div>

          {/* アフィリエイト商品 */}
          {affiliateProducts.length > 0 && (
            <section className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                🛍️ おすすめ商品
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {affiliateProducts.map((product, index) => (
                  <a
                    key={index}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                  >
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {product.name}
                      </h4>
                      {product.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {product.description}
                        </p>
                      )}
                      {product.price && (
                        <p className="text-primary-600 dark:text-primary-400 font-bold">
                          {product.price}
                        </p>
                      )}
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* タグ */}
          {post.tags.length > 0 && (
            <section className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                タグ
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* 関連記事 */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 dark:bg-gray-800 py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                関連記事
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <PostCard
                    key={relatedPost.slug}
                    slug={relatedPost.slug}
                    title={relatedPost.title}
                    description={relatedPost.description}
                    date={relatedPost.date}
                    category={relatedPost.category}
                    tags={relatedPost.tags}
                    thumb={relatedPost.thumb}
                    readingTime={relatedPost.readingTime}
                    author={relatedPost.author}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
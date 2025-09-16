import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Filter, Calendar, TrendingUp } from 'lucide-react';
import { Header, Footer, PostCard } from '@/components';
import { getPostsByCategory } from '@/lib/posts';
import { getCategoryBySlug, CATEGORIES } from '@/lib/categories';
import type { PostMetadata } from '@/types/post';
import type { Category } from '@/types/category';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category: Category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category: Category | undefined = getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: 'カテゴリが見つかりません | トリフレメディア',
    };
  }

  return {
    title: category.seo?.title || `${category.name} | トリフレメディア`,
    description: category.seo?.description || category.description,
    keywords: category.seo?.keywords || [category.name, '一人旅', 'トリフレ'],
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category: Category | undefined = getCategoryBySlug(params.slug);
  
  if (!category) {
    notFound();
  }

  let categoryPosts: PostMetadata[] = [];
  try {
    categoryPosts = await getPostsByCategory(category.name);
  } catch (error) {
    console.error('Error loading category posts:', error);
    categoryPosts = [];
  }

  const sortedPosts: PostMetadata[] = categoryPosts.sort((a: PostMetadata, b: PostMetadata) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featuredPosts: PostMetadata[] = categoryPosts.filter((post: PostMetadata) => post.featured);
  const IconComponent = category.icon;

  // 関連カテゴリ（同じfeaturedステータスのカテゴリ）
  const relatedCategories: Category[] = CATEGORIES
    .filter((cat: Category) => cat.slug !== category.slug && cat.featured === category.featured)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      
      <main className="flex-1">
        {/* パンくずナビ */}
        <nav className="bg-gray-50 dark:bg-gray-800 py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-primary-600 transition-colors">
                  ホーム
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li>
                <Link href="/category" className="text-gray-500 hover:text-primary-600 transition-colors">
                  カテゴリ一覧
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li className="text-gray-900 dark:text-gray-100 font-medium">
                {category.name}
              </li>
            </ol>
          </div>
        </nav>

        {/* カテゴリヘッダー */}
        <section className={`py-16 ${category.color.replace('text-', 'from-').replace('-600', '-50')} bg-gradient-to-r to-blue-50 dark:from-gray-800 dark:to-gray-900`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${category.color}`}>
                <IconComponent className="w-8 h-8" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {category.name}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                {category.description}
              </p>
              
              <div className="flex justify-center items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {categoryPosts.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    記事
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {featuredPosts.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    注目記事
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    新着
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    毎週更新
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* サイドバー */}
            <aside className="lg:col-span-1">
              <div className="space-y-8">
                
                {/* フィルター */}
                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    フィルター
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        並び順
                      </label>
                      <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-background focus:ring-2 focus:ring-primary-500">
                        <option value="latest">最新順</option>
                        <option value="popular">人気順</option>
                        <option value="featured">注目順</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        記事タイプ
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">すべて</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">注目記事</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">初心者向け</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 関連カテゴリ */}
                {relatedCategories.length > 0 && (
                  <div className="card p-6">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                      関連カテゴリ
                    </h3>
                    <div className="space-y-3">
                      {relatedCategories.map((relatedCategory: Category) => {
                        const RelatedIcon = relatedCategory.icon;
                        return (
                          <Link
                            key={relatedCategory.slug}
                            href={`/category/${relatedCategory.slug}`}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${relatedCategory.color}`}>
                              <RelatedIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                                {relatedCategory.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {relatedCategory.count}件
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* メインコンテンツ */}
            <main className="lg:col-span-3">
              
              {/* 注目記事 */}
              {featuredPosts.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-primary-500" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      注目記事
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {featuredPosts.slice(0, 4).map((post: PostMetadata) => (
                      <PostCard
                        key={post.slug}
                        slug={post.slug}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                        category={post.category}
                        tags={post.tags}
                        thumb={post.thumb}
                        readingTime={post.readingTime}
                        author={post.author}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* 最新記事 */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-6 h-6 text-primary-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    最新記事
                  </h2>
                </div>
                
                {sortedPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedPosts.map((post: PostMetadata) => (
                      <PostCard
                        key={post.slug}
                        slug={post.slug}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                        category={post.category}
                        tags={post.tags}
                        thumb={post.thumb}
                        readingTime={post.readingTime}
                        author={post.author}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IconComponent className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      記事を準備中です
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      {category.name}の記事は現在作成中です。<br />
                      他のカテゴリもチェックしてみてください。
                    </p>
                    <Link
                      href="/category"
                      className="btn btn-primary"
                    >
                      他のカテゴリを見る
                    </Link>
                  </div>
                )}
              </section>
            </main>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
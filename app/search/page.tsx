import { Metadata } from 'next';
import { Suspense } from 'react';
import { Search, Filter, Clock, TrendingUp } from 'lucide-react';
import { Header, Footer, PostCard } from '@/components';
import { searchPosts, getAllTags } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import type { PostMetadata } from '@/types/post';

export const metadata: Metadata = {
  title: '検索結果 | トリフレメディア',
  description: '一人旅に関する記事を検索できます。キーワードやカテゴリから、あなたが探している情報を見つけましょう。',
};

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string;
    tag?: string;
  };
}

async function SearchResults({ searchParams }: SearchPageProps) {
  const query: string = searchParams.q || '';
  const category: string = searchParams.category || '';
  const tag: string = searchParams.tag || '';

  let searchResults: PostMetadata[] = [];
  let allTags: string[] = [];

  try {
    if (query) {
      searchResults = await searchPosts(query);
    }
    allTags = await getAllTags();
  } catch (error) {
    console.error('Error searching posts:', error);
    searchResults = [];
    allTags = [];
  }

  // カテゴリまたはタグでフィルタリング
  if (category) {
    searchResults = searchResults.filter((post: PostMetadata) => 
      post.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (tag) {
    searchResults = searchResults.filter((post: PostMetadata) => 
      post.tags.some((postTag: string) => postTag.toLowerCase() === tag.toLowerCase())
    );
  }

  const sortedResults: PostMetadata[] = searchResults.sort((a: PostMetadata, b: PostMetadata) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const popularTags: string[] = allTags.slice(0, 10);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* サイドバー */}
        <aside className="lg:col-span-1">
          <div className="space-y-8">
            
            {/* 検索フィルター */}
            <div className="card p-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                絞り込み
              </h3>
              
              <div className="space-y-6">
                {/* カテゴリフィルター */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    カテゴリ
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="category" 
                        value="" 
                        className="rounded text-primary-500 focus:ring-primary-500"
                        defaultChecked={!category}
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">すべて</span>
                    </label>
                    {CATEGORIES.map((cat) => (
                      <label key={cat.slug} className="flex items-center">
                        <input 
                          type="radio" 
                          name="category" 
                          value={cat.name}
                          className="rounded text-primary-500 focus:ring-primary-500"
                          defaultChecked={category === cat.name}
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 並び順 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    並び順
                  </label>
                  <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-background focus:ring-2 focus:ring-primary-500">
                    <option value="latest">最新順</option>
                    <option value="relevance">関連度順</option>
                    <option value="popular">人気順</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 人気タグ */}
            <div className="card p-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                人気タグ
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((popularTag: string) => (
                  <a
                    key={popularTag}
                    href={`/search?tag=${encodeURIComponent(popularTag)}`}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      tag === popularTag
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900'
                    }`}
                  >
                    #{popularTag}
                  </a>
                ))}
              </div>
            </div>

            {/* 検索のヒント */}
            <div className="card p-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                検索のコツ
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• キーワードは具体的に</li>
                <li>• 複数のキーワードを組み合わせる</li>
                <li>• カテゴリやタグも活用</li>
                <li>• 類義語でも試してみる</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* メインコンテンツ */}
        <main className="lg:col-span-3">
          
          {/* 検索結果ヘッダー */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                検索結果
              </h1>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {sortedResults.length}件見つかりました
              </div>
            </div>
            
            {query && (
              <div className="mb-4">
                <span className="text-gray-600 dark:text-gray-400">検索キーワード: </span>
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  "{query}"
                </span>
              </div>
            )}

            {category && (
              <div className="mb-4">
                <span className="text-gray-600 dark:text-gray-400">カテゴリ: </span>
                <span className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                  {category}
                </span>
              </div>
            )}

            {tag && (
              <div className="mb-4">
                <span className="text-gray-600 dark:text-gray-400">タグ: </span>
                <span className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  #{tag}
                </span>
              </div>
            )}
          </div>

          {/* 検索結果 */}
          {sortedResults.length > 0 ? (
            <div className="space-y-6">
              {sortedResults.map((post: PostMetadata) => (
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
                  size="medium"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                検索結果が見つかりませんでした
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {query ? (
                  <>別のキーワードで検索してみてください</>
                ) : (
                  <>検索キーワードを入力してください</>
                )}
              </p>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  おすすめの検索キーワード:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['一人旅 初心者', '国内 おすすめ', '海外 安全', '予算 節約', '温泉 癒し', 'グルメ 旅行'].map((keyword: string) => (
                    <a
                      key={keyword}
                      href={`/search?q=${encodeURIComponent(keyword)}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                    >
                      {keyword}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ページネーション */}
          {sortedResults.length > 20 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  前へ
                </button>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  次へ
                </button>
              </nav>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function SearchPage(props: SearchPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      
      <main className="flex-1">
        {/* ページヘッダー */}
        <section className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                記事を検索
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                一人旅に関する情報を検索して、あなたにぴったりの記事を見つけましょう
              </p>
              
              {/* 検索バー */}
              <div className="max-w-2xl mx-auto">
                <form method="GET" action="/search" className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                  <input
                    type="text"
                    name="q"
                    defaultValue={props.searchParams.q || ''}
                    placeholder="キーワードを入力してください..."
                    className="w-full pl-14 pr-6 py-4 text-lg rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-primary"
                  >
                    検索
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">検索中...</p>
            </div>
          </div>
        }>
          <SearchResults searchParams={props.searchParams} />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}
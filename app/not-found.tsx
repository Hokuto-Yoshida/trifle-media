import Link from 'next/link';
import { Home, Search, ArrowLeft, MapPin } from 'lucide-react';
import { Header, Footer } from '@/components';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          {/* 404イラスト */}
          <div className="mb-8">
            <div className="relative mx-auto w-48 h-48 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center">
                <div className="text-6xl font-bold text-primary-500 dark:text-primary-400">
                  404
                </div>
              </div>
              
              {/* 浮遊する要素 */}
              <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg animate-bounce">
                <MapPin className="w-6 h-6 text-primary-500" />
              </div>
              
              <div className="absolute -bottom-2 -left-2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
                <Search className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          {/* エラーメッセージ */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              ページが見つかりません
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              お探しのページは移動または削除された可能性があります。
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              URLをご確認いただくか、下記から目的のページをお探しください。
            </p>
          </div>

          {/* アクションボタン */}
          <div className="space-y-4">
            <Link
              href="/"
              className="btn btn-primary btn-lg w-full group"
            >
              <Home className="w-5 h-5 mr-2" />
              トップページに戻る
              <ArrowLeft className="w-4 h-4 ml-2 transition-transform group-hover:-translate-x-1" />
            </Link>
            
            <Link
              href="/search"
              className="btn btn-secondary btn-lg w-full"
            >
              <Search className="w-5 h-5 mr-2" />
              記事を検索する
            </Link>
          </div>

          {/* おすすめリンク */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              おすすめのページ
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <Link
                href="/posts"
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <div className="font-medium text-gray-900 dark:text-gray-100">記事一覧</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">最新の一人旅情報をチェック</div>
              </Link>
              
              <Link
                href="/categories"
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <div className="font-medium text-gray-900 dark:text-gray-100">カテゴリ一覧</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">興味のあるカテゴリから探す</div>
              </Link>
              
              <Link
                href="/app"
                className="p-3 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg hover:from-primary-100 hover:to-blue-100 dark:hover:from-primary-900/30 dark:hover:to-blue-900/30 transition-colors text-left border border-primary-200 dark:border-primary-700"
              >
                <div className="font-medium text-primary-900 dark:text-primary-100">トリフレアプリ</div>
                <div className="text-sm text-primary-700 dark:text-primary-300">一人旅をもっと楽しく、もっと安全に</div>
              </Link>
            </div>
          </div>

          {/* お問い合わせ */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
              お探しのページが見つからない場合は
            </p>
            <Link
              href="/contact"
              className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
            >
              お問い合わせください
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
import { Plane } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* ローディングコンテンツ */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          {/* アニメーションロゴ */}
          <div className="mb-8">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center animate-pulse">
                <Plane className="w-12 h-12 text-white animate-bounce" />
              </div>
              
              {/* 回転する輪 */}
              <div className="absolute inset-0 border-4 border-primary-200 dark:border-primary-800 rounded-2xl animate-spin">
                <div className="absolute top-0 left-0 w-2 h-2 bg-primary-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* ローディングテキスト */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              読み込み中...
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              一人旅の情報を準備しています
            </p>
          </div>

          {/* プログレスバー */}
          <div className="mt-8 w-full max-w-xs mx-auto">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-500 to-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* 装飾的な要素 */}
          <div className="mt-12 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>

      {/* フッタースケルトン */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
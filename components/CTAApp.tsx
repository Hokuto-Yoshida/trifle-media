import Link from 'next/link';
import Image from 'next/image';
import { Download, Star, Users, MapPin, ExternalLink } from 'lucide-react';

export default function CTAApp() {
  const features = [
    {
      icon: MapPin,
      title: '旅行プラン作成',
      description: 'AIが最適なルートを提案'
    },
    {
      icon: Users,
      title: '仲間とつながる',
      description: '同じ趣味の旅行仲間を発見'
    },
    {
      icon: Star,
      title: 'レビュー共有',
      description: 'リアルな体験談をシェア'
    }
  ];

  const stats = [
    { label: 'ダウンロード数', value: '10万+' },
    { label: 'ユーザー評価', value: '4.8★' },
    { label: 'アクティブユーザー', value: '3万+' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* 左側：テキストコンテンツ */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Download className="w-4 h-4" />
                無料ダウンロード
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                <span className="text-primary-500">トリフレアプリ</span>で<br />
                一人旅をもっと楽しく
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Z世代のための一人旅プラットフォーム。AIが提案する最適なルート、同じ趣味の仲間との出会い、安全な旅行をサポートします。
              </p>
            </div>

            {/* 統計情報 */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* 機能一覧 */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTAボタン */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/app"
                className="btn btn-primary btn-lg group"
              >
                <Download className="w-5 h-5 mr-2" />
                アプリをダウンロード
                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/app/features"
                className="btn btn-secondary btn-lg"
              >
                詳しい機能を見る
              </Link>
            </div>

            {/* 注釈 */}
            <p className="text-xs text-gray-500 dark:text-gray-500">
              ※ iOS・Android対応。ダウンロード・基本機能は無料です。
            </p>
          </div>

          {/* 右側：アプリ画面モックアップ */}
          <div className="relative">
            <div className="relative mx-auto max-w-sm">
              {/* スマホフレーム */}
              <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="bg-gray-100 rounded-[2rem] overflow-hidden">
                  {/* 画面コンテンツ */}
                  <div className="bg-gradient-to-b from-primary-500 to-blue-600 p-6 text-white">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold">旅行プラン作成</h3>
                      <p className="text-sm text-blue-100">AIが最適なルートを提案</p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white space-y-4">
                    {/* プラン例 */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-600">1</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">浅草寺</div>
                        <div className="text-xs text-gray-500">9:00 - 11:00</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-600">2</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">東京スカイツリー</div>
                        <div className="text-xs text-gray-500">12:00 - 15:00</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-600">3</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">上野公園</div>
                        <div className="text-xs text-gray-500">16:00 - 18:00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 浮いているUI要素 */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
                <Users className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Star, Users, MapPin, Heart, Shield, Smartphone, Tablet, ArrowRight, Check, Play, Apple } from 'lucide-react';
import { Header, Footer } from '@/components';

export const metadata: Metadata = {
  title: 'トリフレアプリ - 一人旅をもっと楽しく | トリフレメディア',
  description: '若者のための一人旅アプリ「トリフレ」。AIが提案する最適なルート、同じ趣味の仲間との出会い、安全な旅行をサポートします。',
  openGraph: {
    title: 'トリフレアプリ - 一人旅をもっと楽しく',
    description: '若者のための一人旅アプリ「トリフレ」。AIが提案する最適なルート、同じ趣味の仲間との出会い、安全な旅行をサポートします。',
    images: [{ url: '/images/app-og.jpg' }],
  },
};

export default function AppPage() {
  const features = [
    {
      icon: MapPin,
      title: 'AIルート提案',
      description: 'あなたの好みに合わせて最適な旅行ルートを自動生成',
      details: ['予算に応じたプラン作成', '移動時間の最適化', 'おすすめスポット提案']
    },
    {
      icon: Users,
      title: '仲間とのマッチング',
      description: '同じ趣味・興味を持つ旅行仲間を見つけよう',
      details: ['安全なマッチングシステム', '共通の興味でつながる', 'グループ旅行の企画']
    },
    {
      icon: Shield,
      title: '安全サポート',
      description: '一人旅でも安心できる安全機能が充実',
      details: ['緊急連絡機能', '位置情報共有', '24時間サポート']
    },
    {
      icon: Heart,
      title: 'レビュー＆共有',
      description: 'リアルな体験談とおすすめスポットを共有',
      details: ['写真付きレビュー', 'おすすめ度評価', 'コミュニティ機能']
    }
  ];

  const stats = [
    { label: 'ダウンロード数', value: '100,000+', description: '多くのユーザーに愛用されています' },
    { label: 'ユーザー評価', value: '4.8', description: 'App Store・Google Playで高評価', icon: '★' },
    { label: 'アクティブユーザー', value: '30,000+', description: '毎月活発に利用されています' },
    { label: '作成プラン数', value: '500,000+', description: '豊富な旅行プランデータベース' }
  ];

  const screenshots = [
    { src: '/images/app-screen-1.jpg', alt: 'ホーム画面' },
    { src: '/images/app-screen-2.jpg', alt: 'ルート提案画面' },
    { src: '/images/app-screen-3.jpg', alt: 'マッチング画面' },
    { src: '/images/app-screen-4.jpg', alt: 'レビュー画面' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      
      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="relative bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* 左側：テキストコンテンツ */}
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Download className="w-4 h-4" />
                    無料ダウンロード開始
                  </div>
                  
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                    <span className="text-primary-500">トリフレアプリ</span>で<br />
                    一人旅を<span className="text-gradient">もっと楽しく</span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                    若者のための一人旅プラットフォーム。AIが提案する最適なルート、同じ趣味の仲間との出会い、安全な旅行をサポートします。
                  </p>
                </div>

                {/* 統計情報 */}
                <div className="grid grid-cols-2 gap-6">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="text-center lg:text-left">
                      <div className="text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                        {stat.value}{stat.icon}
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {stat.description}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ダウンロードボタン */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#"
                    className="flex items-center justify-center gap-3 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition-colors group"
                  >
                    <Apple className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  
                  <a
                    href="#"
                    className="flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-xl hover:bg-green-700 transition-colors group"
                  >
                    <Play className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-xs">Get it on</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-500">
                  ※ iOS 14.0以降、Android 8.0以降に対応。ダウンロード・基本機能は無料です。
                </p>
              </div>

              {/* 右側：アプリモックアップ */}
              <div className="relative lg:pl-8">
                <div className="relative mx-auto max-w-sm">
                  {/* メインスマホ */}
                  <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="bg-white rounded-[2rem] overflow-hidden">
                      <div className="bg-gradient-to-b from-primary-500 to-blue-600 p-6 text-white">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <MapPin className="w-8 h-8" />
                          </div>
                          <h3 className="text-lg font-bold">おすすめルート</h3>
                          <p className="text-sm text-blue-100">AIが最適なプランを提案</p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white space-y-3">
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
                        
                        <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-bold text-white">3</span>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">上野公園</div>
                            <div className="text-xs text-gray-500">16:00 - 18:00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 浮遊要素 */}
                  <div className="absolute -top-6 -right-6 bg-white rounded-full p-4 shadow-lg animate-bounce-gentle">
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-full p-4 shadow-lg animate-bounce-gentle" style={{ animationDelay: '1s' }}>
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                  
                  <div className="absolute top-1/2 -left-12 bg-white rounded-full p-3 shadow-lg animate-bounce-gentle" style={{ animationDelay: '2s' }}>
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 機能紹介セクション */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                🚀 主な機能
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                一人旅をサポートする充実の機能をご紹介
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="group">
                    <div className="card p-8 h-full hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      
                      <ul className="space-y-2">
                        {feature.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 統計セクション */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                📊 みんなに選ばれています
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                多くのユーザーに愛用されているトリフレアプリ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {stat.value}{stat.icon}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              今すぐ始めよう！
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              あなたの一人旅をもっと楽しく、もっと安全に。<br />
              トリフレアプリで新しい旅の体験を始めませんか？
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="#"
                className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors group"
              >
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              
              <a
                href="#"
                className="flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <Play className="w-6 h-6 text-green-600" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
            
            <p className="text-sm text-blue-100">
              無料ダウンロード・基本機能無料 | iOS 14.0以降・Android 8.0以降対応
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
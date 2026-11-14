import { Metadata } from 'next';
import { Users, MapPin, Shield, MessageCircle, Wallet, Check, Play, Apple } from 'lucide-react';
import { Header, Footer } from '@/components';
import { appStoreUrl, googlePlayUrl } from '@/lib/app-links';

export const metadata: Metadata = {
  title: 'トリフレアプリ - 一人旅の旅仲間マッチング',
  description: '一人旅の旅仲間マッチングアプリ「トリフレ」。旅程を登録して同じ時期・同じ行き先の人とつながり、ご飯や観光を一緒に楽しめます。本人確認・チャット機能つき。',
  openGraph: {
    title: 'トリフレアプリ - 一人旅の旅仲間マッチング',
    description: '一人旅の旅仲間マッチングアプリ「トリフレ」。旅程を登録して同じ時期・同じ行き先の人とつながり、ご飯や観光を一緒に楽しめます。',
  },
};

export default function AppPage() {
  const features = [
    {
      icon: Users,
      title: '旅仲間マッチング',
      description: '旅行日程や目的地を登録すると、同じ旅程の人や旅のスタイルが合う人と出会えます',
      details: ['マッチング前に相手の旅行プランを確認', 'スワイプで気になる旅行者にLike', '複数人のグループも作成可能']
    },
    {
      icon: MapPin,
      title: 'スポット単位で同行募集',
      description: '「このレストラン行く人？」「この観光スポット一緒にどう？」と、旅の一部だけを一緒に',
      details: ['ご飯だけ・観光だけの同行もOK', '一人旅の自由さはそのまま', '同じ行き先の人を場所で検索']
    },
    {
      icon: Wallet,
      title: '割り勘相手探し',
      description: '一人だと割高になりがちなタクシー代や食事代を、同じ旅先の人とシェアできます',
      details: ['タクシー代の割り勘', '食事代の割り勘', '旅費を抑えたい人に']
    },
    {
      icon: Shield,
      title: '本人確認とチャット',
      description: '身分証による本人確認済みのユーザーだけを表示することも可能。やり取りはアプリ内で完結します',
      details: ['身分証による本人確認', '連絡先を交換せずにチャット', '通報・ブロック機能']
    }
  ];

  const screenshots = [
    { src: '/images/app-screenshots/swipe-screen.webp', alt: '旅仲間を探すスワイプ画面' },
    { src: '/images/app-screenshots/travel-list.webp', alt: '旅仲間募集の一覧画面' },
    { src: '/images/app-screenshots/chat-screen.webp', alt: 'マッチングした相手とのチャット画面' }
  ];

  const storeButtons = (placement: string) => (
    <div className="flex flex-col sm:flex-row gap-4">
      <a
        href={appStoreUrl(placement)}
        target="_blank"
        rel="noopener"
        className="flex items-center justify-center gap-3 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition-colors"
      >
        <Apple className="w-6 h-6" />
        <div className="text-left">
          <div className="text-xs">Download on the</div>
          <div className="text-sm font-semibold">App Store</div>
        </div>
      </a>
      <a
        href={googlePlayUrl(placement)}
        target="_blank"
        rel="noopener"
        className="flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-xl hover:bg-green-700 transition-colors"
      >
        <Play className="w-6 h-6" />
        <div className="text-left">
          <div className="text-xs">Get it on</div>
          <div className="text-sm font-semibold">Google Play</div>
        </div>
      </a>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="relative bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Users className="w-4 h-4" />
                    一人旅の旅仲間マッチングアプリ
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                    一人旅に、<br />
                    <span className="text-primary-500">もう一人の仲間を。</span>
                  </h1>

                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                    行きたい場所に、行きたい時に。一人旅の自由さはそのままに、旅先でご飯や観光を一緒に楽しめる仲間と出会えます。
                  </p>
                </div>

                {storeButtons('app-page-hero')}

                <p className="text-xs text-gray-500 dark:text-gray-500">
                  ※ 基本無料。スワイプ無制限・詳細フィルターなどは有料プラン「トリフレPro」（月額700円）。iPhone版はiOS 15.1以降に対応。
                </p>
              </div>

              <div className="flex justify-center">
                <img
                  src="/images/app-screenshots/swipe-screen.webp"
                  alt="トリフレアプリの旅仲間を探す画面"
                  className="w-64 h-auto rounded-[2rem] shadow-2xl"
                  width="390"
                  height="844"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 機能紹介セクション */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                主な機能
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                感情を分かち合い、コストも分け合える
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="card p-8 h-full">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
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
                );
              })}
            </div>
          </div>
        </section>

        {/* スクリーンショット */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                アプリの画面
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                <MessageCircle className="inline w-5 h-5 mr-1" />
                マッチングした相手とは、連絡先を交換せずにアプリ内でやり取りできます
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
              {screenshots.map((shot) => (
                <img
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  className="w-56 h-auto rounded-[2rem] shadow-lg"
                  width="390"
                  height="844"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="py-20 bg-gradient-to-r from-primary-500 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              次の一人旅で使ってみよう
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              旅程を登録するだけで、同じ時期に同じ場所を旅する人が見つかります。
            </p>

            <div className="flex justify-center mb-8">
              {storeButtons('app-page-bottom')}
            </div>

            <p className="text-sm text-blue-100">
              基本無料（一部機能は有料プラン）｜運営：株式会社Riorno
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

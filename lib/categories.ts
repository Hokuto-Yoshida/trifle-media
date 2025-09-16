import { Heart, MapPin, Plane, Map, Wrench, MessageCircle } from 'lucide-react';
import { Category } from '@/types/category';

export const CATEGORIES: Category[] = [
  {
    name: 'はじめての一人旅',
    slug: 'hajimete',
    description: '一人旅デビューを安心サポート。初心者向けの準備方法、心構え、おすすめスポットを紹介。',
    icon: Heart,
    color: 'bg-pink-100 text-pink-600 border-pink-200',
    count: 0,
    seo: {
      title: 'はじめての一人旅ガイド | トリフレメディア',
      description: '一人旅初心者のための完全ガイド。準備から実践まで、安心して一人旅を楽しむためのノウハウを解説。',
      keywords: ['一人旅', '初心者', 'はじめて', '準備', 'ガイド'],
    },
    featured: true,
  },
  {
    name: '国内スポット',
    slug: 'kokunai',
    description: '日本全国の隠れた名所から定番スポットまで。一人旅にぴったりな国内旅行先を厳選紹介。',
    icon: MapPin,
    color: 'bg-blue-100 text-blue-600 border-blue-200',
    count: 0,
    seo: {
      title: '国内一人旅スポット | トリフレメディア',
      description: '日本全国の一人旅におすすめな観光スポット、グルメ、宿泊施設を詳しく紹介。',
      keywords: ['国内旅行', '一人旅', '観光スポット', '日本', 'おすすめ'],
    },
    featured: true,
  },
  {
    name: '海外ビギナー',
    slug: 'kaigai',
    description: '初めての海外一人旅ガイド。ビザ、治安、予算など、海外旅行の基礎知識をわかりやすく解説。',
    icon: Plane,
    color: 'bg-green-100 text-green-600 border-green-200',
    count: 0,
    seo: {
      title: '海外一人旅ビギナーガイド | トリフレメディア',
      description: '初めての海外一人旅を成功させるための準備方法、安全対策、おすすめ渡航先を詳しく解説。',
      keywords: ['海外旅行', '一人旅', 'ビギナー', '初心者', '海外'],
    },
    featured: true,
  },
  {
    name: 'モデルコース',
    slug: 'course',
    description: '効率的な旅行プランニング。1日〜1週間の様々な一人旅モデルコースを予算別に提案。',
    icon: Map,
    color: 'bg-purple-100 text-purple-600 border-purple-200',
    count: 0,
    seo: {
      title: '一人旅モデルコース | トリフレメディア',
      description: '予算別・期間別の一人旅モデルコース。効率的な旅行プランで充実した一人旅を実現。',
      keywords: ['モデルコース', '旅行プラン', '一人旅', 'プランニング', 'コース'],
    },
    featured: false,
  },
  {
    name: '体験談',
    slug: 'taiken',
    description: 'リアルな一人旅エピソード。失敗談から成功体験まで、生の声をお届け。',
    icon: MessageCircle,
    color: 'bg-orange-100 text-orange-600 border-orange-200',
    count: 0,
    seo: {
      title: '一人旅体験談 | トリフレメディア',
      description: '実際の一人旅体験談を多数掲載。リアルな声から学ぶ一人旅のコツとノウハウ。',
      keywords: ['体験談', '一人旅', 'エピソード', '失敗談', '成功体験'],
    },
    featured: false,
  },
  {
    name: 'ツール&テンプレ',
    slug: 'tools',
    description: '旅行準備に便利なツール。チェックリスト、予算計算表、旅行プラン作成テンプレートなど。',
    icon: Wrench,
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    count: 0,
    seo: {
      title: '旅行ツール&テンプレート | トリフレメディア',
      description: '一人旅の準備に役立つツールとテンプレート集。チェックリストや計画表を無料ダウンロード。',
      keywords: ['旅行ツール', 'テンプレート', 'チェックリスト', '旅行準備', 'ダウンロード'],
    },
    featured: false,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category: Category) => category.slug === slug);
}

export function updateCategoryCount(categoryName: string, count: number): Category[] {
  return CATEGORIES.map((category: Category) => 
    category.name === categoryName 
      ? { ...category, count }
      : category
  );
}

export function getFeaturedCategories(): Category[] {
  return CATEGORIES.filter((category: Category) => category.featured);
}

export function getCategoryNames(): string[] {
  return CATEGORIES.map((category: Category) => category.name);
}

export function getCategorySlugs(): string[] {
  return CATEGORIES.map((category: Category) => category.slug);
}
import { MapPin, Plane, Utensils, Hotel, Lightbulb, Book } from 'lucide-react';
import { Category } from '@/types/category';

export const CATEGORIES: Category[] = [
  {
    name: '国内旅行',
    slug: 'domestic',
    description: '日本全国の一人旅スポットやモデルコース。北海道から沖縄まで、国内旅行のすべてをご紹介。',
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
    name: '海外旅行',
    slug: 'international',
    description: '海外一人旅の行き先選びと実践ガイド。ビザ・安全・予算など海外旅行の基礎知識を解説。',
    icon: Plane,
    color: 'bg-green-100 text-green-600 border-green-200',
    count: 0,
    seo: {
      title: '海外一人旅ガイド | トリフレメディア',
      description: '初めての海外一人旅を成功させるための準備方法、安全対策、おすすめ渡航先を詳しく解説。',
      keywords: ['海外旅行', '一人旅', 'ビギナー', '初心者', '海外'],
    },
    featured: true,
  },
  {
    name: 'グルメ',
    slug: 'gourmet',
    description: '一人でも入りやすいお店や食べ歩き情報。旅先で楽しむグルメガイド。',
    icon: Utensils,
    color: 'bg-orange-100 text-orange-600 border-orange-200',
    count: 0,
    seo: {
      title: '一人旅グルメ情報 | トリフレメディア',
      description: '一人旅中のグルメ情報。一人でも入りやすいお店や食べ歩きスポットをご紹介。',
      keywords: ['グルメ', '一人旅', '食べ歩き', 'レストラン', 'ランチ'],
    },
    featured: false,
  },
  {
    name: '宿泊',
    slug: 'accommodation',
    description: 'ホテル・旅館・ゲストハウスの選び方。一人旅向けの宿泊施設情報。',
    icon: Hotel,
    color: 'bg-purple-100 text-purple-600 border-purple-200',
    count: 0,
    seo: {
      title: '一人旅おすすめ宿泊施設 | トリフレメディア',
      description: '一人旅に最適なホテル・旅館・ゲストハウスの選び方と予約のコツ。',
      keywords: ['宿泊', 'ホテル', '旅館', 'ゲストハウス', '一人旅'],
    },
    featured: false,
  },
  {
    name: '旅のコツ',
    slug: 'tips',
    description: '準備・安全対策・予算設計の実用ノウハウ。一人旅をもっと楽しく快適にするヒント集。',
    icon: Lightbulb,
    color: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    count: 0,
    seo: {
      title: '一人旅のコツ・ノウハウ | トリフレメディア',
      description: '一人旅の準備から実践まで、安全で楽しい旅のコツとノウハウを解説。',
      keywords: ['旅のコツ', '一人旅', '準備', '安全', '予算'],
    },
    featured: true,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category: Category) => category.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return CATEGORIES.find((category: Category) => category.name === name);
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

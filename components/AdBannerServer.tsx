import AdBannerClient from './AdBannerClient';
import { getLatestPosts, getAllPosts } from '@/lib/posts';

const CATEGORY_ORDER = ['国内旅行', '海外旅行', 'グルメ', '宿泊', '旅のコツ'];
const CATEGORY_SLUG_MAP: Record<string, string> = {
  '国内旅行': 'domestic',
  '海外旅行': 'international',
  'グルメ': 'gourmet',
  '宿泊': 'accommodation',
  '旅のコツ': 'tips',
};

export default async function AdBannerServer() {
  const [latestPosts, allPosts] = await Promise.all([
    getLatestPosts(5),
    getAllPosts(),
  ]);

  const categoryMap: Record<string, number> = {};
  allPosts.forEach(p => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  });

  const categories = CATEGORY_ORDER
    .filter(name => categoryMap[name])
    .map(name => ({ name, slug: CATEGORY_SLUG_MAP[name], count: categoryMap[name] }));

  const sidebarPosts = latestPosts.map(p => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    thumb: p.thumb || '/images/default-thumb.jpg',
  }));

  return <AdBannerClient latestPosts={sidebarPosts} categories={categories} />;
}

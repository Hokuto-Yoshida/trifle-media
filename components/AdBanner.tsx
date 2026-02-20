'use client';

import { useEffect, useState } from 'react';
import AdBannerClient, { SidebarCategory, SidebarPost } from './AdBannerClient';

export default function AdBanner() {
  const [latestPosts, setLatestPosts] = useState<SidebarPost[]>([]);
  const [categories, setCategories] = useState<SidebarCategory[]>([]);

  useEffect(() => {
    const fetchSidebar = async () => {
      try {
        const res = await fetch('/api/sidebar');
        if (!res.ok) throw new Error('sidebar fetch failed');
        const data = await res.json();
        setLatestPosts(data.latestPosts || []);
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Failed to load sidebar data', error);
      }
    };

    fetchSidebar();
  }, []);

  return (
    <AdBannerClient
      latestPosts={latestPosts}
      categories={categories}
    />
  );
}

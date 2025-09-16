export interface Post {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  thumb: string;
  readingTime: number;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  featured: boolean;
  draft: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  affiliate?: {
    products?: AffiliateProduct[];
    hotels?: AffiliateHotel[];
  };
}

export interface AffiliateProduct {
  name: string;
  url: string;
  price?: string;
  description?: string;
  image?: string;
  provider: 'amazon' | 'rakuten' | 'yahoo' | 'other';
}

export interface AffiliateHotel {
  name: string;
  location: string;
  bookingUrl: string;
  price?: string;
  rating?: number;
  image?: string;
  provider: 'booking' | 'agoda' | 'hotels' | 'jalan' | 'rakuten' | 'other';
}

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  thumb: string;
  readingTime: number;
  author: {
    name: string;
    avatar?: string;
  };
  featured: boolean;
  draft: boolean;
}
import { LucideIcon } from 'lucide-react';

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  color: string;
  count: number;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  featured?: boolean;
}

export interface CategoryPage {
  category: Category;
  posts: PostMetadata[];
  totalPages: number;
  currentPage: number;
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
}
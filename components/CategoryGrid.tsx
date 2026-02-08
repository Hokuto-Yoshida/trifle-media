import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/types/category';

interface CategoryGridProps {
  categories: Category[];
  className?: string;
}

const categoryGridStyles = `
  .category-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  @media (min-width: 768px) {
    .category-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .category-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .category-card-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }
  
  .category-card {
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 24px;
    height: 80%;
    transition: all 0.3s ease;
  }
  
  .category-card:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
  
  .category-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  
  .category-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    background-color: #ecfdf5;
    color: #10b981;
  }
  
  .category-card:hover .category-icon {
    transform: scale(1.1);
  }
  
  .category-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .category-count {
    font-weight: 500;
  }
  
  .category-arrow {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }
  
  .category-card:hover .category-arrow {
    transform: translateX(4px);
  }
  
  .category-title {
    font-weight: bold;
    font-size: 1.125rem;
    color: #1f2937;
    margin-bottom: 8px;
    transition: color 0.3s ease;
  }
  
  .category-card:hover .category-title {
    color: #10b981;
  }
  
  .category-description {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.6;
  }
  
  .category-footer {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
  }
  
  .category-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .category-action-text {
    font-weight: 500;
  }
  
  .progress-container {
    width: 24px;
    height: 4px;
    background-color: #f3f4f6;
    border-radius: 2px;
    overflow: hidden;
  }
  
  .progress-bar {
    width: 100%;
    height: 100%;
    background-color: #10b981;
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }
  
  .category-card:hover .progress-bar {
    transform: translateX(0);
  }
  
  /* カテゴリ別の色設定 */
  .category-icon-domestic {
    background-color: #fef3c7;
    color: #f59e0b;
  }
  
  .category-icon-international {
    background-color: #dbeafe;
    color: #3b82f6;
  }
  
  .category-icon-budget {
    background-color: #ecfdf5;
    color: #10b981;
  }
  
  .category-icon-safety {
    background-color: #fce7f3;
    color: #ec4899;
  }
  
  .category-icon-culture {
    background-color: #f3e8ff;
    color: #8b5cf6;
  }
  
  .category-icon-nature {
    background-color: #d1fae5;
    color: #059669;
  }
`;

export default function CategoryGrid({ categories, className }: CategoryGridProps) {
  const getCategoryIconClass = (categorySlug: string) => {
    const colorMap: Record<string, string> = {
      'domestic': 'category-icon-domestic',
      'international': 'category-icon-international', 
      'budget': 'category-icon-budget',
      'safety': 'category-icon-safety',
      'culture': 'category-icon-culture',
      'nature': 'category-icon-nature'
    };
    
    return colorMap[categorySlug] || 'category-icon-budget';
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: categoryGridStyles }} />
      
      <div className={cn('category-grid', className)}>
        {categories.map((category) => {
          const IconComponent = category.icon;
          
          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="category-card-link"
            >
              <div className="category-card">
                <div className="category-header">
                  <div className={`category-icon ${getCategoryIconClass(category.slug)}`}>
                    <IconComponent style={{ width: '24px', height: '24px' }} />
                  </div>
                  
                  <div className="category-meta">
                    <span className="category-count">{category.count}件</span>
                    <ArrowRight className="category-arrow" />
                  </div>
                </div>

                <h3 className="category-title">
                  {category.name}
                </h3>

                <p className="category-description">
                  {category.description}
                </p>

                {/* プログレスバー的な装飾 */}
                <div className="category-footer">
                  <div className="category-action">
                    <span className="category-action-text">記事を読む</span>
                    <div className="progress-container">
                      <div className="progress-bar" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

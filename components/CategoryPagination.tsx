'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  thumb: string;
  readingTime: number;
  author: any;
  featured: boolean;
}

interface CategoryPaginationProps {
  posts: PostMetadata[];
  categorySlug: string;
  postsPerPage: number;
}

const paginationStyles = `
  /* Pagination */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 40px;
  }

  .pagination-button {
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    background: white;
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.2s;
    cursor: pointer;
    min-width: 44px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination-button:hover {
    background-color: #f9fafb;
    border-color: #00d084;
    color: #00d084;
  }

  .pagination-button.active {
    background: #00d084;
    color: white;
    border-color: #00d084;
  }

  .pagination-button:disabled {
    background: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
    border-color: #e5e7eb;
  }

  .pagination-button:disabled:hover {
    background: #f3f4f6;
    color: #9ca3af;
    border-color: #e5e7eb;
  }

  .pagination-ellipsis {
    padding: 12px 8px;
    color: #9ca3af;
    font-size: 14px;
  }

  /* Results info */
  .results-info {
    text-align: center;
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
  }

  /* Posts grid */
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }

  /* Article cards */
  .article-card {
    background: white;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    transition: all 0.2s ease;
    text-decoration: none;
    color: inherit;
  }

  .article-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .article-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    background: #f3f4f6;
  }

  .article-content {
    padding: 16px;
  }

  .article-category {
    display: inline-block;
    background: #00d084;
    color: white;
    padding: 3px 8px;
    font-size: 11px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .article-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    line-height: 1.4;
    color: #333;
  }

  .article-excerpt {
    color: #666;
    font-size: 13px;
    line-height: 1.4;
    margin-bottom: 8px;
  }

  .article-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: #999;
    margin-bottom: 12px;
  }

  /* Read more button */
  .read-more-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: #00d084;
    color: white;
    text-decoration: none;
    font-size: 12px;
    font-weight: 500;
    border-radius: 4px;
    transition: all 0.2s ease;
  }

  .read-more-button:hover {
    background: #059669;
    transform: translateY(-1px);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .posts-grid {
      grid-template-columns: 1fr;
    }
    
    .pagination {
      flex-wrap: wrap;
      gap: 4px;
    }

    .pagination-button {
      padding: 8px 12px;
      font-size: 12px;
      min-width: 36px;
    }
  }
`;

// ページネーションコンポーネント
function Pagination({ currentPage, totalPages, onPageChange }: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination">
      {/* 前のページボタン */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="pagination-button"
      >
        <ChevronLeft size={16} />
      </button>

      {/* ページ番号 */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>;
        }
        
        const pageNum = page as number;
        const isActive = pageNum === currentPage;
        
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`pagination-button ${isActive ? 'active' : ''}`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* 次のページボタン */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="pagination-button"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function CategoryPagination({ posts, categorySlug, postsPerPage }: CategoryPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // URLからページ番号を取得してセット
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (page > 0) {
        setCurrentPage(page);
      }
    }
  }, []);

  // ページ変更時の処理
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // URLを更新（ブラウザの履歴に追加）
    const url = new URL(window.location.href);
    if (page === 1) {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', page.toString());
    }
    window.history.pushState({}, '', url.toString());
    
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ページネーション計算
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: paginationStyles }} />
      
      {/* 結果情報 */}
      <div className="results-info">
        全{totalPosts}件中 {startIndex + 1}〜{Math.min(endIndex, totalPosts)}件を表示（{currentPage}/{totalPages}ページ）
      </div>

      {/* 記事グリッド */}
      <div className="posts-grid">
        {currentPosts.map((post: PostMetadata) => (
          <article key={post.slug} className="article-card">
            <img 
              src={post.thumb || '/placeholder-image.jpg'} 
              alt={post.title}
              className="article-image"
            />
            <div className="article-content">
              <span className="article-category">{post.category}</span>
              <h3 className="article-title">{post.title}</h3>
              <p className="article-excerpt">{post.description}</p>
              <div className="article-meta">
                <span>{new Date(post.date).toLocaleDateString('ja-JP')}</span>
                <span>{post.readingTime}分</span>
              </div>
              <a href={`/posts/${post.slug}`} className="read-more-button">
                この記事を見る
                <ArrowRight size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
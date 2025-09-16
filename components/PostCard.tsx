import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { cn, formatDate, formatReadingTime } from '@/lib/utils';

interface PostCardProps {
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
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const postCardStyles = `
  .post-card {
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .post-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  .post-card-large {
    display: flex;
    flex-direction: column;
  }
  
  @media (min-width: 1024px) {
    .post-card-large {
      flex-direction: row;
    }
  }
  
  .post-image-container {
    position: relative;
    overflow: hidden;
  }
  
  .post-image-small {
    height: 128px;
  }
  
  .post-image-medium {
    height: 192px;
  }
  
  .post-image-large {
    height: 192px;
  }
  
  @media (min-width: 1024px) {
    .post-image-large {
      width: 320px;
      height: auto;
      min-height: 200px;
    }
  }
  
  .post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .post-card:hover .post-image {
    transform: scale(1.05);
  }
  
  .post-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
  }
  
  .post-category-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background-color: #10b981;
    color: white;
    font-size: 0.75rem;
    font-weight: 500;
    border-radius: 9999px;
  }
  
  .post-content {
    padding: 16px;
  }
  
  .post-content-large {
    padding: 24px;
    flex: 1;
  }
  
  .post-content-small {
    padding: 12px;
  }
  
  .post-content-inner {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .post-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.75rem;
    color: #6b7280;
    margin-bottom: 8px;
  }
  
  .post-meta-small {
    margin-bottom: 4px;
  }
  
  .post-meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .post-title {
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.3s ease;
  }
  
  .post-title:hover {
    color: #10b981;
  }
  
  .post-title-small {
    font-size: 0.875rem;
  }
  
  .post-title-medium {
    font-size: 1.125rem;
  }
  
  .post-title-large {
    font-size: 1.25rem;
  }
  
  @media (min-width: 1024px) {
    .post-title-large {
      font-size: 1.5rem;
    }
  }
  
  .post-title-link {
    text-decoration: none;
    color: inherit;
  }
  
  .post-title-link:hover {
    text-decoration: underline;
  }
  
  .post-description {
    color: #6b7280;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }
  
  .post-description-medium {
    font-size: 0.875rem;
  }
  
  .post-description-large {
    font-size: 1rem;
  }
  
  .post-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
  }
  
  .post-author {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .post-author-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  
  .post-author-placeholder {
    width: 24px;
    height: 24px;
    background-color: #e5e7eb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .post-author-name {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .post-tags {
    display: flex;
    gap: 4px;
  }
  
  .post-tag {
    padding: 4px 8px;
    background-color: #f3f4f6;
    color: #6b7280;
    font-size: 0.75rem;
    border-radius: 6px;
  }
`;

export default function PostCard({
  slug,
  title,
  description,
  date,
  category,
  tags,
  thumb,
  readingTime,
  author,
  size = 'medium',
  className,
}: PostCardProps) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: postCardStyles }} />
      
      <article className={cn(
        'post-card',
        isLarge && 'post-card-large',
        className
      )}>
        <Link href={`/posts/${slug}`}>
          <div className={cn(
            'post-image-container',
            isSmall ? 'post-image-small' : isLarge ? 'post-image-large' : 'post-image-medium'
          )}>
            <Image
              src={thumb}
              alt={title}
              fill
              className="post-image"
              sizes={isLarge ? '(max-width: 1024px) 100vw, 320px' : '(max-width: 768px) 100vw, 400px'}
            />
            <div className="post-image-overlay" />
            
            {/* カテゴリバッジ */}
            <div className="post-category-badge">
              <Tag style={{ width: '12px', height: '12px' }} />
              {category}
            </div>
          </div>
        </Link>

        <div className={cn(
          'post-content',
          isLarge && 'post-content-large',
          isSmall && 'post-content-small'
        )}>
          <div className="post-content-inner">
            {/* メタ情報 */}
            <div className={cn(
              'post-meta',
              isSmall && 'post-meta-small'
            )}>
              <div className="post-meta-item">
                <Calendar style={{ width: '12px', height: '12px' }} />
                <time dateTime={date}>{formatDate(date)}</time>
              </div>
              <div className="post-meta-item">
                <Clock style={{ width: '12px', height: '12px' }} />
                {formatReadingTime(readingTime)}
              </div>
            </div>

            {/* タイトル */}
            <h2 className={cn(
              'post-title',
              isSmall ? 'post-title-small' : isLarge ? 'post-title-large' : 'post-title-medium'
            )}>
              <Link href={`/posts/${slug}`} className="post-title-link">
                {title}
              </Link>
            </h2>

            {/* 説明文 */}
            {!isSmall && (
              <p className={cn(
                'post-description',
                isLarge ? 'post-description-large' : 'post-description-medium'
              )}>
                {description}
              </p>
            )}

            {/* フッター */}
            <div className="post-footer">
              {/* 著者情報 */}
              <div className="post-author">
                {author.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={24}
                    height={24}
                    className="post-author-avatar"
                  />
                ) : (
                  <div className="post-author-placeholder">
                    <User style={{ width: '12px', height: '12px', color: '#9ca3af' }} />
                  </div>
                )}
                <span className="post-author-name">{author.name}</span>
              </div>

              {/* タグ（小さい場合は表示しない） */}
              {!isSmall && tags.length > 0 && (
                <div className="post-tags">
                  {tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="post-tag">
                      #{tag}
                    </span>
                  ))}
                  {tags.length > 2 && (
                    <span className="post-tag">
                      +{tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
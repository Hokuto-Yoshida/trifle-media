import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  siteUrl?: string;
}

const breadcrumbStyles = `
  .breadcrumb-nav {
    padding: 12px 0;
    font-size: 13px;
    color: #6b7280;
  }

  .breadcrumb-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .breadcrumb-link {
    color: #6b7280;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .breadcrumb-link:hover {
    color: #00d084;
  }

  .breadcrumb-current {
    color: #374151;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 300px;
  }

  .breadcrumb-separator {
    color: #d1d5db;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    .breadcrumb-current {
      max-width: 180px;
    }
  }
`;

export default function Breadcrumb({ items, siteUrl = 'https://torifure.com' }: BreadcrumbProps) {
  const allItems = [{ label: 'ホーム', href: '/' }, ...items];

  // JSON-LD BreadcrumbList スキーマ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style dangerouslySetInnerHTML={{ __html: breadcrumbStyles }} />
      <nav aria-label="パンくずリスト" className="breadcrumb-nav">
        <ol className="breadcrumb-list">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={index} className="breadcrumb-item">
                {index > 0 && (
                  <ChevronRight size={14} className="breadcrumb-separator" />
                )}
                {isLast || !item.href ? (
                  <span className="breadcrumb-current" title={item.label}>
                    {index === 0 && <Home size={13} />}
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="breadcrumb-link">
                    {index === 0 && <Home size={13} />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

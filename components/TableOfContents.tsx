'use client';

import { useState, useEffect } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 記事内の見出しを取得
    const articleContent = document.querySelector('.article-content');
    if (!articleContent) return;

    const headingElements = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const tocItems: TocItem[] = [];

    headingElements.forEach((heading, index) => {
      // IDがない場合は自動生成
      if (!heading.id) {
        const id = `heading-${index + 1}`;
        heading.id = id;
      }

      tocItems.push({
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      });
    });

    setHeadings(tocItems);

    // スクロール位置の監視
    const observerOptions = {
      rootMargin: '-20% 0% -60% 0%',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100; // ヘッダー分のオフセット
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="table-of-contents">
      <style dangerouslySetInnerHTML={{ __html: tocStyles }} />
      
      <div className="toc-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="toc-title">
          <List size={18} />
          <span>目次</span>
        </div>
        <button className="toc-toggle" aria-label="目次を開閉">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {isOpen && (
        <nav className="toc-content">
          <ol className="toc-list">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`toc-item level-${heading.level} ${
                  activeId === heading.id ? 'active' : ''
                }`}
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className="toc-link"
                  title={heading.text}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}

const tocStyles = `
  .table-of-contents {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    margin: 30px 0;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .toc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: white;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s;
  }

  .toc-header:hover {
    background: #f8f9fa;
  }

  .toc-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: #495057;
  }

  .toc-toggle {
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .toc-toggle:hover {
    background: #e9ecef;
    color: #495057;
  }

  .toc-content {
    padding: 0 20px 20px 20px;
  }

  .toc-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .toc-item {
    margin: 0;
    padding: 0;
  }

  .toc-link {
    display: block;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 8px 0;
    color: #6c757d;
    text-decoration: none;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
    line-height: 1.4;
    font-size: 14px;
  }

  .toc-link:hover {
    color: #00d084;
    background: rgba(0, 208, 132, 0.1);
    padding-left: 8px;
  }

  .toc-item.active .toc-link {
    color: #00d084;
    font-weight: 600;
    background: rgba(0, 208, 132, 0.1);
    padding-left: 8px;
  }

  /* 見出しレベルに応じたインデント */
  .toc-item.level-1 .toc-link {
    font-weight: 600;
    color: #495057;
  }

  .toc-item.level-2 .toc-link {
    padding-left: 16px;
  }

  .toc-item.level-3 .toc-link {
    padding-left: 32px;
    font-size: 13px;
  }

  .toc-item.level-4 .toc-link {
    padding-left: 48px;
    font-size: 13px;
  }

  .toc-item.level-5 .toc-link {
    padding-left: 64px;
    font-size: 12px;
  }

  .toc-item.level-6 .toc-link {
    padding-left: 80px;
    font-size: 12px;
  }

  /* アクティブ状態でもインデントを維持 */
  .toc-item.level-2.active .toc-link,
  .toc-item.level-2 .toc-link:hover {
    padding-left: 24px;
  }

  .toc-item.level-3.active .toc-link,
  .toc-item.level-3 .toc-link:hover {
    padding-left: 40px;
  }

  .toc-item.level-4.active .toc-link,
  .toc-item.level-4 .toc-link:hover {
    padding-left: 56px;
  }

  .toc-item.level-5.active .toc-link,
  .toc-item.level-5 .toc-link:hover {
    padding-left: 72px;
  }

  .toc-item.level-6.active .toc-link,
  .toc-item.level-6 .toc-link:hover {
    padding-left: 88px;
  }

  @media (max-width: 640px) {
    .table-of-contents {
      margin: 20px 0;
      font-size: 13px;
    }

    .toc-header {
      padding: 12px 16px;
    }

    .toc-content {
      padding: 0 16px 16px 16px;
    }

    .toc-link {
      padding: 6px 0;
      font-size: 13px;
    }

    .toc-item.level-3 .toc-link,
    .toc-item.level-4 .toc-link {
      font-size: 12px;
    }

    .toc-item.level-5 .toc-link,
    .toc-item.level-6 .toc-link {
      font-size: 11px;
    }
  }
`;
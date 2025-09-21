'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchSidebar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // URLを変更してクライアントサイド検索を実行
      window.location.href = `/search#q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sidebarStyles }} />
      <aside className="search-sidebar">
        <div className="sidebar-container">
          {/* 検索欄 */}
          <div className="search-section">
            <h3 className="search-title">記事検索</h3>
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="キーワードを入力"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* アドセンス申請後に広告エリアとして使用予定 */}
          <div className="future-ad-space">
            <p className="placeholder-text">
              ここにアドセンス広告が<br />
              表示される予定です
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

// サイドバー用スタイル
const sidebarStyles = `
  /* PC表示：右サイドバー */
  .search-sidebar {
    width: 300px;
    flex-shrink: 0;
    margin-left: 20px;
  }

  .sidebar-container {
    background: transparent;
    padding: 0;
    height: fit-content;
  }

  /* 検索セクション */
  .search-section {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .search-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
    text-align: center;
  }

  .search-form {
    width: 100%;
  }

  .search-input-wrapper {
    display: flex;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
  }

  .search-input {
    flex: 1;
    padding: 10px 12px;
    border: none;
    outline: none;
    font-size: 14px;
    background: transparent;
  }

  .search-input::placeholder {
    color: #9ca3af;
  }

  .search-button {
    padding: 10px 12px;
    background: #00d084;
    border: none;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-button:hover {
    background: #059669;
  }

  /* 将来の広告スペース（開発用プレースホルダー） */
  .future-ad-space {
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 8px;
    padding: 40px 20px;
    text-align: center;
    margin-bottom: 20px;
  }

  .placeholder-text {
    color: #6c757d;
    font-size: 12px;
    line-height: 1.4;
    margin: 0;
  }

  /* タブレット・スマホ表示：下部配置 */
  @media (max-width: 1024px) {
    .search-sidebar {
      width: 100%;
      margin: 40px 0 20px 0;
    }

    .sidebar-container {
      margin: 0 20px;
    }

    .future-ad-space {
      padding: 30px 20px;
    }
  }

  @media (max-width: 640px) {
    .sidebar-container {
      margin: 0 16px;
    }

    .search-section {
      padding: 16px;
    }

    .future-ad-space {
      padding: 20px 16px;
    }
  }
`;
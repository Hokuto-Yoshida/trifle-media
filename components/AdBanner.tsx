'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function AdBanner() {
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
      <style dangerouslySetInnerHTML={{ __html: adStyles }} />
      <aside className="ad-banner">
        <div className="ad-container">
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

          {/* 広告を入れる時はここにdivやscriptタグを追加 */}
        </div>
      </aside>
    </>
  );
}

// 広告用スタイル
const adStyles = `
  /* PC表示：右サイドバー */
  .ad-banner {
    width: 300px;
    flex-shrink: 0;
    margin-left: 20px;
  }

  .ad-container {
    background: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    min-height: 600px;
    height: fit-content;
  }

  /* 検索セクション */
  .search-section {
    background: #fff;
    border-radius: 6px;
    padding: 16px;
    margin-bottom: 16px;
    border: 1px solid #e0e0e0;
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

  /* 広告が追加された時のスタイル */
  .ad-container > *:not(.search-section) {
    margin-bottom: 16px;
  }

  .ad-container > *:last-child {
    margin-bottom: 0;
  }

  /* タブレット・スマホ表示：下部配置 */
  @media (max-width: 1024px) {
    .ad-banner {
      width: 100%;
      margin: 40px 0 20px 0;
    }

    .ad-container {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 16px;
      min-height: 200px;
      margin: 0 20px;
    }

    .search-section {
      margin-bottom: 16px;
    }
  }

  @media (max-width: 640px) {
    .ad-container {
      margin: 0 16px;
    }
  }
`;
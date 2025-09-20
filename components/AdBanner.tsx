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

          {/* トラベリスト広告（飛行機予約） */}
          <div className="ad-section">
            <h4 className="ad-section-title">航空券予約</h4>
            <div className="ad-item">
              <a 
                href="https://px.a8.net/svt/ejp?a8mat=45E3PX+91O4OI+4XZI+609HT" 
                rel="nofollow"
                className="ad-link"
                target="_blank"
              >
                <img 
                  src="https://www28.a8.net/svt/bgt?aid=250920789547&wid=001&eno=01&mid=s00000023067001009000&mc=1"
                  alt="トラベリスト - 航空券価格比較・予約サイト" 
                  title="格安航空券をお探しならトラベリスト"
                  className="ad-banner-image"
                  width="300" 
                  height="250"
                />
              </a>
              <img 
                src="https://www13.a8.net/0.gif?a8mat=45E3PX+91O4OI+4XZI+609HT" 
                alt=""
                width="1" 
                height="1"
                style={{display: 'none'}}
              />
            </div>
          </div>

          {/* スーツケース広告 */}
          <div className="ad-section">
            <h4 className="ad-section-title">おすすめ旅行グッズ</h4>
            <div className="ad-item">
              <a 
                href="https://hb.afl.rakuten.co.jp/ichiba/4c844e24.c22610c9.4c844e25.5377dfd4/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkures-store%2F801lgx%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjI0MHgyNDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MCwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" 
                target="_blank" 
                rel="nofollow sponsored noopener" 
                className="ad-link"
              >
                <div className="ad-content">
                  <img 
                    src="https://hbb.afl.rakuten.co.jp/hgb/4c844e24.c22610c9.4c844e25.5377dfd4/?me_id=1404310&item_id=10000373&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fkures-store%2Fcabinet%2Fmainimg%2F00cp06%2F801lgx_60off.jpg%3F_ex%3D240x240&s=240x240&t=pict" 
                    alt="軽量スーツケース" 
                    title="旅行におすすめ！軽量・大容量スーツケース"
                    className="ad-image"
                  />
                  <div className="ad-text">
                    <p className="ad-title">軽量スーツケース</p>
                    <p className="ad-description">旅行に最適な軽量・大容量タイプ</p>
                    <p className="ad-price">特別価格で販売中！</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
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
    background: transparent;
    border-radius: 8px;
    padding: 0;
    height: fit-content;
    overflow: hidden;
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

  /* 広告セクション */
  .ad-section {
    background: #fff;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .ad-section:last-child {
    margin-bottom: 0;
  }

  .ad-section-title {
    font-size: 14px;
    font-weight: 600;
    color: #666;
    margin-bottom: 15px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .ad-item {
    width: 100%;
  }

  .ad-link {
    display: block;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s;
  }

  .ad-link:hover {
    transform: translateY(-2px);
  }

  /* トラベリストバナー広告 */
  .ad-banner-image {
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: box-shadow 0.2s;
  }

  .ad-banner-image:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  /* スーツケース広告 */
  .ad-content {
    text-align: center;
  }

  .ad-image {
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 6px;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .ad-text {
    padding: 0 10px;
  }

  .ad-title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 4px;
  }

  .ad-description {
    font-size: 12px;
    color: #666;
    margin-bottom: 6px;
    line-height: 1.4;
  }

  .ad-price {
    font-size: 12px;
    color: #d63384;
    font-weight: 600;
  }

  /* タブレット・スマホ表示：下部配置 */
  @media (max-width: 1024px) {
    .ad-banner {
      width: 100%;
      margin: 40px 0 20px 0;
    }

    .ad-container {
      margin: 0 20px;
    }

    /* モバイルでスーツケース広告は横並びレイアウトに変更 */
    .ad-content {
      display: flex;
      align-items: center;
      text-align: left;
      gap: 15px;
    }

    .ad-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .ad-text {
      flex: 1;
      padding: 0;
    }
  }

  @media (max-width: 640px) {
    .ad-container {
      margin: 0 16px;
    }

    .search-section, .ad-section {
      padding: 16px;
    }
  }
`;
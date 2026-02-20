'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

export type SidebarPost = {
  slug: string;
  title: string;
  category: string;
  thumb: string;
};

export type SidebarCategory = {
  name: string;
  slug: string;
  count: number;
};

type Props = {
  latestPosts: SidebarPost[];
  categories: SidebarCategory[];
};

export default function AdBannerClient({ latestPosts, categories }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  // load AdSense once on client
  useEffect(() => {
    if (!document.querySelector('script[src*=\"adsbygoogle.js\"]')) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7569727810444713';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search#q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: adStyles }} />
      <aside className="ad-banner">
        <div className="ad-container">
          <div className="search-section">
            <h3 className="search-title">記事検索</h3>
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="キーワードで検索"
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

          <div className="ad-section">
            <h4 className="ad-section-title">おすすめ</h4>
            <div className="ad-item">
              <a
                href="https://px.a8.net/svt/ejp?a8mat=45E3PX+91O4OI+4XZI+609HT"
                rel="nofollow"
                className="ad-link"
                target="_blank"
              >
                <img
                  src="https://www28.a8.net/svt/bgt?aid=250920789547&wid=001&eno=01&mid=s00000023067001009000&mc=1"
                  alt="トリフィル - 比較サービス"
                  title="トリフィルおすすめ"
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
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="ad-section">
            <h4 className="ad-section-title">eSIM</h4>
            <div className="ad-item">
              <a
                href="https://px.a8.net/svt/ejp?a8mat=45E262+91O4OI+5NG6+5YZ75"
                rel="nofollow"
                className="ad-link"
                target="_blank"
              >
                <img
                  src="https://www27.a8.net/svt/bgt?aid=250918778547&wid=001&eno=01&mid=s00000026367001003000&mc=1"
                  alt="海外旅行eSIM"
                  title="海外旅行eSIM"
                  className="ad-banner-image"
                  width="300"
                  height="250"
                />
              </a>
              <img
                src="https://www15.a8.net/0.gif?a8mat=45E262+91O4OI+5NG6+5YZ75"
                alt=""
                width="1"
                height="1"
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="ad-section">
            <h4 className="ad-section-title">ホテル・旅館</h4>
            <div className="ad-item">
              <a
                href="https://hb.afl.rakuten.co.jp/hsc/4c9fef55.71199632.4c798cf5.ac347f21/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiIxMzMiLCJiYW4iOjIxODg2NTcsImFtcCI6ZmFsc2V9"
                target="_blank"
                rel="nofollow sponsored noopener"
                className="ad-link"
              >
                <img
                  src="https://hbb.afl.rakuten.co.jp/hsb/4c9fef55.71199632.4c798cf5.ac347f21/?me_id=2100001&me_adv_id=2188657&t=pict"
                  alt="ホテル・旅館の予約"
                  title="ホテル・旅館の予約"
                  className="ad-banner-image"
                />
              </a>
            </div>
          </div>

          <div className="ad-section">
            <h4 className="ad-section-title">旅行グッズ</h4>
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
                    alt="スーツケース"
                    title="旅行向けスーツケース"
                    className="ad-image"
                  />
                  <div className="ad-text">
                    <p className="ad-title">軽量スーツケース</p>
                    <p className="ad-description">旅に使える人気モデルをチェック</p>
                    <p className="ad-price">セール価格</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Latest posts */}
          {latestPosts.length > 0 && (
            <div className="sidebar-section">
              <div className="section-heading">★ 新着記事</div>
              <div className="post-list">
                {latestPosts.map((post) => (
                  <a key={post.slug} href={`/posts/${post.slug}`} className="post-list-item">
                    <img src={post.thumb} alt={post.title} className="post-thumb" />
                    <div className="post-list-text">
                      <span className="post-chip secondary">NEW</span>
                      <p className="post-title">{post.title}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <div className="sidebar-section">
              <div className="section-heading">カテゴリ</div>
              <div className="category-list">
                {categories.map((category) => (
                  <a key={category.slug} href={`/categories/${category.slug}`} className="category-item">
                    <span>{category.name}</span>
                    <span className="category-count">{category.count}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

const adStyles = `
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

  .search-form { width: 100%; }

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

  .search-input::placeholder { color: #9ca3af; }

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

  .search-button:hover { background: #059669; }

  .ad-section {
    background: #fff;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .ad-section:last-child { margin-bottom: 0; }

  .ad-section-title {
    font-size: 14px;
    font-weight: 600;
    color: #666;
    margin-bottom: 15px;
    text-align: center;
    letter-spacing: 0.5px;
  }

  .ad-item { width: 100%; }

  .ad-link {
    display: block;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s;
  }

  .ad-link:hover { transform: translateY(-2px); }

  .ad-banner-image {
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: box-shadow 0.2s;
  }

  .ad-banner-image:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }

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

  .ad-text { padding: 0 10px; }

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

  .sidebar-section {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    margin-bottom: 20px;
  }

  .section-heading {
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 12px;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 8px;
    text-align: center;
  }

  .post-list { display: flex; flex-direction: column; gap: 12px; }

  .post-list-item {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 10px;
    text-decoration: none;
    color: inherit;
    align-items: center;
  }

  .post-thumb {
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: 8px;
    background: #f3f4f6;
    border: 1px solid #e5e7eb;
  }

  .post-list-text { display: flex; flex-direction: column; gap: 6px; }

  .post-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    font-size: 11px;
    background: #eefcf5;
    color: #0f9d58;
    border-radius: 9999px;
    width: fit-content;
  }

  .post-chip.secondary { background: #eef2ff; color: #4338ca; }

  .post-title {
    font-size: 13px;
    font-weight: 600;
    color: #1f2937;
    line-height: 1.4;
  }

  .category-list { display: flex; flex-direction: column; gap: 10px; }

  .category-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    color: #111827;
    font-weight: 600;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid #f3f4f6;
    transition: background 0.2s, border-color 0.2s;
  }

  .category-item:hover { background: #f8fafc; border-color: #e5e7eb; }

  .category-count {
    font-size: 12px;
    color: #6b7280;
    background: #eef2ff;
    padding: 2px 8px;
    border-radius: 9999px;
  }

  @media (max-width: 1024px) {
    .ad-banner { width: 100%; margin: 40px 0 20px 0; }
    .ad-container { margin: 0 20px; }
    .post-list-item { grid-template-columns: 96px 1fr; }
    .post-thumb { width: 96px; height: 96px; }
    .ad-content { display: flex; align-items: center; text-align: left; gap: 15px; }
    .ad-image { width: 80px; height: 80px; object-fit: cover; flex-shrink: 0; margin-bottom: 0; }
    .ad-text { flex: 1; padding: 0; }
  }

  @media (max-width: 640px) {
    .ad-container { margin: 0 16px; }
    .search-section, .ad-section, .sidebar-section { padding: 16px; }
    .post-list-item { grid-template-columns: 80px 1fr; }
  }
`;

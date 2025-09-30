'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

type SubCategory = { name: string; href: string };
type CategoryItem = { 
  name: string; 
  href: string;
  subCategories?: SubCategory[];
};

const styles = `
  .header-wrapper{position:sticky;top:0;z-index:100;box-shadow:0 2px 4px rgba(0,0,0,.1)}
  .header-top{background:#fff;border-bottom:1px solid #e5e7eb}
  .header-top-container{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:16px 20px}
  .header-logo{display:flex;align-items:center;gap:12px}
  .logo-image{height:60px;width:auto;transition:opacity .2s}
  .logo-image:hover{opacity:.8}
  .header-top-nav{display:flex;list-style:none;gap:40px;margin:0;padding:0}
  .header-top-nav a{color:#333;text-decoration:none;font-size:14px;font-weight:600;transition:color .2s}
  .header-top-nav a:hover{color:#00d084}

  .nav-header{background:#00d084;color:#fff}
  .nav-container{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:center;padding:0 20px;position:relative;min-height:50px}
  .nav-menu{display:flex;list-style:none;margin:0;padding:0}
  .nav-item{position:relative}
  .nav-link{display:flex;align-items:center;gap:4px;padding:15px 24px;color:#fff;text-decoration:none;font-weight:500;font-size:14px;transition:background-color .2s;white-space:nowrap;cursor:pointer}
  .nav-link:hover{background:rgba(255,255,255,.1)}
  .nav-link.has-sub:hover{background:rgba(255,255,255,.15)}

  .dropdown{position:absolute;top:100%;left:0;background:#fff;min-width:200px;box-shadow:0 4px 12px rgba(0,0,0,.15);border-radius:0 0 8px 8px;opacity:0;visibility:hidden;transform:translateY(-10px);transition:all .2s;z-index:1000}
  .nav-item:hover .dropdown{opacity:1;visibility:visible;transform:translateY(0)}
  .dropdown-list{list-style:none;margin:0;padding:8px 0}
  .dropdown-item{border-bottom:1px solid #f3f4f6}
  .dropdown-item:last-child{border-bottom:none}
  .dropdown-link{display:block;padding:12px 20px;color:#333;text-decoration:none;font-size:14px;transition:background-color .2s}
  .dropdown-link:hover{background:#f9fafb;color:#00d084}

  .mobile-menu-button{display:none;background:none;border:none;color:#fff;cursor:pointer;padding:8px;position:absolute;left:20px}
  .mobile-menu{display:none;position:absolute;top:100%;left:0;right:0;background:#00d084;border-top:1px solid rgba(255,255,255,.1);z-index:1000;max-height:80vh;overflow-y:auto}
  .mobile-menu.active{display:block}
  .mobile-menu-list{list-style:none;margin:0;padding:0}
  .mobile-menu-item{border-bottom:1px solid rgba(255,255,255,.1)}
  .mobile-menu-link{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;color:#fff;text-decoration:none;font-weight:500;background:none;border:none;width:100%;text-align:left;cursor:pointer}
  .mobile-menu-link:hover{background:rgba(255,255,255,.1)}
  
  .mobile-sub-menu{background:rgba(0,0,0,.1);display:none}
  .mobile-sub-menu.active{display:block}
  .mobile-sub-link{display:block;padding:12px 20px 12px 40px;color:#fff;text-decoration:none;font-size:14px;font-weight:400}
  .mobile-sub-link:hover{background:rgba(255,255,255,.1)}

  .chevron-icon{transition:transform .2s}
  .chevron-icon.rotated{transform:rotate(180deg)}

  @media (max-width: 968px){
    .header-top-nav{display:none}
    .nav-menu{display:none}
    .mobile-menu-button{display:block}
  }
`;

const TOP_LINKS = [
  { name: '記事', href: '/posts' },
  { name: 'アプリダウンロード', href: 'https://tripfriend-website.netlify.app' },
  { name: 'お問い合わせ', href: '/contact' },
];

const CATEGORY_LINKS: CategoryItem[] = [
  { 
    name: '国内旅行', 
    href: '/categories/domestic',
    subCategories: [
      { name: '北海道・東北', href: '/categories/domestic/hokkaido-tohoku' },
      { name: '関東', href: '/categories/domestic/kanto' },
      { name: '中部・北陸', href: '/categories/domestic/chubu-hokuriku' },
      { name: '関西', href: '/categories/domestic/kansai' },
      { name: '中国・四国', href: '/categories/domestic/chugoku-shikoku' },
      { name: '九州・沖縄', href: '/categories/domestic/kyushu-okinawa' },
    ]
  },
  { 
    name: '海外旅行', 
    href: '/categories/international',
    subCategories: [
      { name: 'アジア', href: '/categories/international/asia' },
      { name: 'ヨーロッパ', href: '/categories/international/europe' },
      { name: '北米・南米', href: '/categories/international/americas' },
      { name: 'オセアニア', href: '/categories/international/oceania' },
      { name: '中東・アフリカ', href: '/categories/international/middle-east-africa' },
    ]
  },
  { 
    name: 'グルメ', 
    href: '/categories/gourmet',
    subCategories: [
      { name: '和食', href: '/categories/gourmet/japanese' },
      { name: '洋食', href: '/categories/gourmet/western' },
      { name: '中華・アジア料理', href: '/categories/gourmet/asian' },
      { name: 'カフェ・スイーツ', href: '/categories/gourmet/cafe-sweets' },
    ]
  },
  { 
    name: '宿泊', 
    href: '/categories/accommodation',
    subCategories: [
      { name: 'ホテル', href: '/categories/accommodation/hotel' },
      { name: '旅館・民宿', href: '/categories/accommodation/ryokan' },
      { name: 'ゲストハウス', href: '/categories/accommodation/guesthouse' },
      { name: 'グランピング・キャンプ', href: '/categories/accommodation/glamping' },
    ]
  },
  { 
    name: '旅のコツ', 
    href: '/categories/tips',
    subCategories: [
      { name: '安全・準備', href: '/categories/tips/safety' },
      { name: '計画・予算', href: '/categories/tips/planning' },
      { name: '持ち物・パッキング', href: '/categories/tips/packing' },
      { name: '写真・SNS', href: '/categories/tips/photography' },
      { name: 'トラブル対処', href: '/categories/tips/trouble' },
      { name: 'お得情報', href: '/categories/tips/deals' },
    ]
  },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleMobileCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryName)) {
        next.delete(categoryName);
      } else {
        next.add(categoryName);
      }
      return next;
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="header-wrapper">
        {/* 上段（白） */}
        <header className="header-top">
          <div className="header-top-container">
            <div className="header-logo">
              <Link href="/">
                <img 
                  src="/logo.png" 
                  alt="トリフレメディア" 
                  className="logo-image"
                />
              </Link>
            </div>
            <nav aria-label="トップナビ">
              <ul className="header-top-nav">
                {TOP_LINKS.map(l => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {/* 下段（緑） */}
        <nav className="nav-header" aria-label="カテゴリナビ">
          <div className="nav-container">
            <button
              className="mobile-menu-button"
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* デスクトップメニュー */}
            <ul className="nav-menu">
              {CATEGORY_LINKS.map(category => (
                <li key={category.href} className="nav-item">
                  <Link 
                    href={category.href} 
                    className={`nav-link ${category.subCategories ? 'has-sub' : ''}`}
                  >
                    {category.name}
                    {category.subCategories && <ChevronDown size={16} />}
                  </Link>
                  
                  {category.subCategories && (
                    <div className="dropdown">
                      <ul className="dropdown-list">
                        {category.subCategories.map(sub => (
                          <li key={sub.href} className="dropdown-item">
                            <Link href={sub.href} className="dropdown-link">
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* モバイルメニュー */}
            <div id="mobile-menu" className={`mobile-menu ${mobileOpen ? 'active' : ''}`}>
              <ul className="mobile-menu-list">
                {TOP_LINKS.map(l => (
                  <li key={l.href} className="mobile-menu-item">
                    <Link href={l.href} className="mobile-menu-link" onClick={() => setMobileOpen(false)}>
                      {l.name}
                    </Link>
                  </li>
                ))}

                <li className="mobile-menu-item" style={{borderTop:'1px solid rgba(255,255,255,0.2)', marginTop:8, paddingTop:8}}>
                  <span className="mobile-menu-link" style={{opacity:.85}}>カテゴリ</span>
                </li>

                {CATEGORY_LINKS.map(category => (
                  <li key={category.href} className="mobile-menu-item">
                    {category.subCategories ? (
                      <>
                        <button
                          className="mobile-menu-link"
                          onClick={() => toggleMobileCategory(category.name)}
                        >
                          {category.name}
                          <ChevronDown 
                            size={16} 
                            className={`chevron-icon ${expandedCategories.has(category.name) ? 'rotated' : ''}`}
                          />
                        </button>
                        <div className={`mobile-sub-menu ${expandedCategories.has(category.name) ? 'active' : ''}`}>
                          {category.subCategories.map(sub => (
                            <Link 
                              key={sub.href} 
                              href={sub.href} 
                              className="mobile-sub-link"
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link 
                        href={category.href} 
                        className="mobile-menu-link" 
                        onClick={() => setMobileOpen(false)}
                      >
                        {category.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
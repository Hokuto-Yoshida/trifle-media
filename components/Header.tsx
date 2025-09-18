'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

type LinkItem = { name: string; href: string };

const styles = `
  .header-wrapper{position:sticky;top:0;z-index:100;box-shadow:0 2px 4px rgba(0,0,0,.1)}
  .header-top{background:#fff;border-bottom:1px solid #e5e7eb}
  .header-top-container{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:16px 20px}
  .header-logo{display:flex;align-items:center;gap:12px}
  .logo-text{font-size:2rem;font-weight:700;color:#00d084;text-decoration:none}
  .header-top-nav{display:flex;list-style:none;gap:40px;margin:0;padding:0}
  .header-top-nav a{color:#333;text-decoration:none;font-size:14px;font-weight:600;transition:color .2s}
  .header-top-nav a:hover{color:#00d084}

  .nav-header{background:#00d084;color:#fff}
  .nav-container{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:center;padding:0 20px;position:relative;min-height:50px}
  .nav-menu{display:flex;list-style:none;margin:0;padding:0}
  .nav-item{position:relative}
  .nav-link{display:block;padding:15px 32px;color:#fff;text-decoration:none;font-weight:500;font-size:14px;transition:background-color .2s;white-space:nowrap}
  .nav-link:hover{background:rgba(255,255,255,.1)}

  .mobile-menu-button{display:none;background:none;border:none;color:#fff;cursor:pointer;padding:8px;position:absolute;left:20px}
  .mobile-menu{display:none;position:absolute;top:100%;left:0;right:0;background:#00d084;border-top:1px solid rgba(255,255,255,.1);z-index:1000}
  .mobile-menu.active{display:block}
  .mobile-menu-list{list-style:none;margin:0;padding:0}
  .mobile-menu-item{border-bottom:1px solid rgba(255,255,255,.1)}
  .mobile-menu-link{display:block;padding:16px 20px;color:#fff;text-decoration:none;font-weight:500}
  .mobile-menu-link:hover{background:rgba(255,255,255,.1)}

  @media (max-width: 968px){
    .header-top-nav{display:none}
    .nav-menu{display:none}
    .mobile-menu-button{display:block}
  }
`;

const TOP_LINKS: LinkItem[] = [
  { name: '記事', href: '/posts' },
  { name: 'アプリダウンロード', href: 'https://tripfriend-website.netlify.app' },
  { name: 'お問い合わせ', href: '/contact' },
];

const CATEGORY_LINKS: LinkItem[] = [
  { name: '国内旅行', href: '/categories/domestic' },
  { name: '海外旅行', href: '/categories/international' },
  { name: 'グルメ', href: '/categories/gourmet' },
  { name: '宿泊', href: '/categories/accommodation' },
  { name: '安全・準備', href: '/categories/safety' },
  { name: '旅のコツ', href: '/categories/tips' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="header-wrapper">
        {/* 上段（白） */}
        <header className="header-top">
          <div className="header-top-container">
            <div className="header-logo">
              <Link href="/" className="logo-text">トリフレ</Link>
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
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(v => !v)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>

            <ul className="nav-menu">
              {CATEGORY_LINKS.map(l => (
                <li key={l.href} className="nav-item">
                  <Link href={l.href} className="nav-link">{l.name}</Link>
                </li>
              ))}
            </ul>

            <div id="mobile-menu" className={`mobile-menu ${open ? 'active' : ''}`}>
              <ul className="mobile-menu-list">
                {TOP_LINKS.map(l => (
                  <li key={l.href} className="mobile-menu-item">
                    <Link href={l.href} className="mobile-menu-link" onClick={() => setOpen(false)}>
                      {l.name}
                    </Link>
                  </li>
                ))}

                <li className="mobile-menu-item" style={{borderTop:'1px solid rgba(255,255,255,0.2)', marginTop:8, paddingTop:8}}>
                  <span className="mobile-menu-link" style={{opacity:.85}}>カテゴリ</span>
                </li>

                {CATEGORY_LINKS.map(l => (
                  <li key={l.href} className="mobile-menu-item">
                    <Link href={l.href} className="mobile-menu-link" onClick={() => setOpen(false)}>
                      {l.name}
                    </Link>
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
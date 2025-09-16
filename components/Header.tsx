'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Moon, Sun, Plane } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/categories';
import type { Category } from '@/types/category';

const headerStyles = `
  .header-container {
    position: sticky;
    top: 0;
    z-index: 50;
    width: 100%;
    border-bottom: 1px solid #d1d5db;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    transition: all 0.2s;
  }
  
  .header-scrolled {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }
  
  .header-inner {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    font-size: 1.25rem;
    text-decoration: none;
    color: inherit;
  }
  
  .logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #10b981, #059669);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .logo-text-primary {
    color: #10b981;
  }
  
  .logo-text-secondary {
    color: #6b7280;
    font-weight: normal;
  }
  
  .desktop-nav {
    display: none;
    align-items: center;
    gap: 32px;
  }
  
  @media (min-width: 768px) {
    .desktop-nav {
      display: flex;
    }
  }
  
  .nav-link {
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s;
    text-decoration: none;
    color: #6b7280;
  }
  
  .nav-link:hover {
    color: #10b981;
  }
  
  .nav-link-active {
    color: #10b981;
  }
  
  .desktop-actions {
    display: none;
    align-items: center;
    gap: 16px;
  }
  
  @media (min-width: 768px) {
    .desktop-actions {
      display: flex;
    }
  }
  
  .icon-button {
    padding: 8px;
    color: #6b7280;
    transition: color 0.2s;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 6px;
  }
  
  .icon-button:hover {
    color: #10b981;
  }
  
  .app-button {
    padding: 6px 12px;
    background-color: #10b981;
    color: white;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }
  
  .app-button:hover {
    background-color: #059669;
  }
  
  .mobile-menu-button {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  @media (min-width: 768px) {
    .mobile-menu-button {
      display: none;
    }
  }
  
  .mobile-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
  }
  
  .mobile-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
  }
  
  .mobile-menu {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    max-width: 320px;
    background: white;
    border-left: 1px solid #e5e7eb;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .mobile-menu-title {
    font-weight: 600;
  }
  
  .mobile-nav {
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
  }
  
  .mobile-nav-link {
    font-size: 1.125rem;
    font-weight: 500;
    padding: 8px 0;
    transition: color 0.2s;
    text-decoration: none;
    color: #1f2937;
  }
  
  .mobile-nav-link:hover {
    color: #10b981;
  }
  
  .mobile-nav-link-active {
    color: #10b981;
  }
  
  .mobile-section {
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
    margin-top: 16px;
  }
  
  .mobile-section-title {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 16px;
  }
  
  .mobile-category-link {
    display: block;
    color: #6b7280;
    transition: color 0.2s;
    padding: 4px 0;
    text-decoration: none;
  }
  
  .mobile-category-link:hover {
    color: #10b981;
  }
  
  .mobile-theme-button {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6b7280;
    transition: color 0.2s;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-size: inherit;
  }
  
  .mobile-theme-button:hover {
    color: #10b981;
  }
  
  .mobile-app-button {
    padding: 12px 16px;
    background-color: #10b981;
    color: white;
    border-radius: 6px;
    font-weight: 500;
    text-decoration: none;
    text-align: center;
    display: block;
    transition: background-color 0.2s;
    border: none;
    cursor: pointer;
    width: 100%;
  }
  
  .mobile-app-button:hover {
    background-color: #059669;
  }
  
  .search-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
  }
  
  .search-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }
  
  .search-modal-container {
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 512px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  .search-modal {
    background: white;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    border: 1px solid #e5e7eb;
    padding: 24px;
  }
  
  .search-form {
    margin-bottom: 16px;
  }
  
  .search-input-container {
    position: relative;
  }
  
  .search-input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    width: 20px;
    height: 20px;
  }
  
  .search-input {
    width: 100%;
    padding: 16px 16px 16px 48px;
    font-size: 1.125rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    outline: none;
    transition: all 0.2s;
  }
  
  .search-input:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  .search-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .search-hint {
    font-size: 0.875rem;
    color: #9ca3af;
  }
  
  .search-buttons {
    display: flex;
    gap: 8px;
  }
  
  .search-button-secondary {
    padding: 6px 12px;
    background-color: #f3f4f6;
    color: #1f2937;
    border-radius: 6px;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .search-button-secondary:hover {
    background-color: #e5e7eb;
  }
  
  .search-button-primary {
    padding: 6px 12px;
    background-color: #10b981;
    color: white;
    border-radius: 6px;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .search-button-primary:hover {
    background-color: #059669;
  }
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // ウィンドウサイズをチェック
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navigation = [
    { name: 'ホーム', href: '/' },
    { name: '記事一覧', href: '/posts' },
    { name: 'カテゴリ', href: '/category' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: headerStyles }} />
      
      <header className={`header-container ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-inner">
          <div className="header-content">
            {/* Logo */}
            <Link href="/" className="logo-container">
              <div className="logo-icon">
                <Plane style={{ width: '20px', height: '20px', color: 'white' }} />
              </div>
              <span className="logo-text-primary">トリフレ</span>
              {mounted && !isMobile && (
                <span className="logo-text-secondary">メディア</span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? 'nav-link-active' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="desktop-actions">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="icon-button"
              >
                <Search style={{ width: '20px', height: '20px' }} />
              </button>

              {/* App CTA */}
              <a 
                href="https://tripfriend-website.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="app-button"
              >
                📱 アプリ
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="mobile-menu-button">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="icon-button"
              >
                <Search style={{ width: '20px', height: '20px' }} />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="icon-button"
              >
                {isMenuOpen ? (
                  <X style={{ width: '24px', height: '24px' }} />
                ) : (
                  <Menu style={{ width: '24px', height: '24px' }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-overlay">
          <div className="mobile-backdrop" onClick={() => setIsMenuOpen(false)} />
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">メニュー</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="icon-button"
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            
            <nav className="mobile-nav">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`mobile-nav-link ${pathname === item.href ? 'mobile-nav-link-active' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="mobile-section">
                <h3 className="mobile-section-title">カテゴリ</h3>
                {CATEGORIES.slice(0, 4).map((category: Category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="mobile-category-link"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              
              <div className="mobile-section">
                <a
                  href="https://tripfriend-website.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="mobile-app-button"
                  style={{ marginTop: '16px' }}
                >
                  📱 アプリをダウンロード
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="search-modal-overlay">
          <div className="search-modal-backdrop" onClick={() => setIsSearchOpen(false)} />
          <div className="search-modal-container">
            <div className="search-modal">
              <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-container">
                  <Search className="search-input-icon" />
                  <input
                    type="text"
                    placeholder="記事を検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    autoFocus
                  />
                </div>
              </form>
              <div className="search-actions">
                <p className="search-hint">
                  Enterで検索、Escでキャンセル
                </p>
                <div className="search-buttons">
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="search-button-secondary"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleSearch}
                    className="search-button-primary"
                  >
                    検索
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
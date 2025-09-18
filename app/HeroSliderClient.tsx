"use client";

import React from 'react';
import { ArrowRight, Heart, Users, Shield } from 'lucide-react';

const HeroSliderClient = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const slides = [
    {
      id: 'main',
      content: (
        <>
          <h1 className="hero-main-title">一人旅に、もう一人の仲間を。</h1>
          <p className="hero-subtitle">感情を分かち合い、コストも分け合える。</p>
          <p className="hero-app-subtitle">一人旅専用マッチングアプリ</p>
        </>
      )
    },
    {
      id: 'swipe',
      content: (
        <>
          {/* Desktop Layout */}
          <div className="feature-slide">
            <div className="feature-content">
              <div className="feature-icon">
                <Heart size={24} color="white" />
              </div>
              <h2 className="feature-title">直感的なスワイプで<br />理想の旅仲間を発見</h2>
              <p className="feature-description">
                スワイプするだけで、同じ目的地や興味を持つ旅仲間を見つけられます。運命の出会いが、旅をさらに楽しく！
              </p>
            </div>
            <div className="feature-screenshot">
              <div className="screenshot-container">
                <img 
                  src="/images/screenshots/swipe-screen.png" 
                  alt="仲間探しのスワイプ画面"
                  className="screenshot-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="screenshot-placeholder" style={{ display: 'none' }}>
                  <div className="screenshot-title">仲間探しのスワイプ画面</div>
                  <div className="screenshot-description">
                    同じ目的地を旅する仲間をスワイプで探索。プロフィール情報で安心してマッチング。
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="feature-slide-mobile">
            <div className="feature-content-mobile">
              <div className="feature-icon">
                <Heart size={20} color="white" />
              </div>
              <h2 className="feature-title">直感的なスワイプで理想の旅仲間を発見</h2>
            </div>
            <div className="feature-screenshot">
              <div className="screenshot-container">
                <img 
                  src="/images/screenshots/swipe-screen.png" 
                  alt="仲間探しのスワイプ画面"
                  className="screenshot-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="screenshot-placeholder" style={{ display: 'none' }}>
                  <div className="screenshot-title">スワイプ画面</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'plan',
      content: (
        <>
          {/* Desktop Layout */}
          <div className="feature-slide">
            <div className="feature-content">
              <div className="feature-icon">
                <Users size={24} color="white" />
              </div>
              <h2 className="feature-title">詳細な旅行プランを<br />簡単に作成・共有</h2>
              <p className="feature-description">
                「一緒に行く理由」「割り勘情報」「時間帯」まで細かく設定可能。お互いのニーズに合った仲間と、最高の瞬間を共有しましょう。
              </p>
            </div>
            <div className="feature-screenshot">
              <div className="screenshot-container">
                <img 
                  src="/images/screenshots/travel-planning-screen.png" 
                  alt="旅行作成画面"
                  className="screenshot-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="screenshot-placeholder" style={{ display: 'none' }}>
                  <div className="screenshot-title">旅行作成画面</div>
                  <div className="screenshot-description">
                    目的地、時間、予算、募集理由まで詳細に設定して理想の旅仲間を募集。
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="feature-slide-mobile">
            <div className="feature-content-mobile">
              <div className="feature-icon">
                <Users size={20} color="white" />
              </div>
              <h2 className="feature-title">詳細な旅行プランを簡単に作成・共有</h2>
            </div>
            <div className="feature-screenshot">
              <div className="screenshot-container">
                <img 
                  src="/images/screenshots/travel-planning-screen.png" 
                  alt="旅行作成画面"
                  className="screenshot-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="screenshot-placeholder" style={{ display: 'none' }}>
                  <div className="screenshot-title">旅行作成画面</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'chat',
      content: (
        <>
          {/* Desktop Layout */}
          <div className="feature-slide">
            <div className="feature-content">
              <div className="feature-icon">
                <Shield size={24} color="white" />
              </div>
              <h2 className="feature-title">安心・安全な<br />メッセージ機能</h2>
              <p className="feature-description">
                「仲間募集中」「定員達成」など、募集状況が明確に表示。本人確認機能と通報システムで、安心して使える体験を提供します。
              </p>
            </div>
            <div className="feature-screenshot">
              <div className="screenshot-container">
                <img 
                  src="/images/screenshots/chat-screen.png" 
                  alt="チャット画面"
                  className="screenshot-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="screenshot-placeholder" style={{ display: 'none' }}>
                  <div className="screenshot-title">チャット画面</div>
                  <div className="screenshot-description">
                    安全な環境でメッセージ交換。本人確認済みマークで安心してコミュニケーション。
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="feature-slide-mobile">
            <div className="feature-content-mobile">
              <div className="feature-icon">
                <Shield size={20} color="white" />
              </div>
              <h2 className="feature-title">安心・安全なメッセージ機能</h2>
            </div>
            <div className="feature-screenshot">
              <div className="screenshot-container">
                <img 
                  src="/images/screenshots/chat-screen.png" 
                  alt="チャット画面"
                  className="screenshot-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const placeholder = target.nextElementSibling as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className="screenshot-placeholder" style={{ display: 'none' }}>
                  <div className="screenshot-title">チャット画面</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'download',
      content: (
        <>
          <h2 className="hero-main-title">今すぐダウンロード</h2>
          <p className="hero-subtitle">一人旅をもっと楽しく、もっと安全に。</p>
          <div className="hero-app-buttons">
            <a href="#" className="app-store-button">
              App Store
            </a>
            <a href="#" className="app-store-button">
              Google Play
            </a>
          </div>
        </>
      )
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // 4秒ごとに切り替え

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          {slide.content}
        </div>
      ))}
      
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`slide-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSliderClient;
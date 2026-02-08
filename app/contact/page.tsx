'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header, Footer } from '@/components';

const styles = `
  .contact-page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f9fafb;
  }
  
  .contact-main {
    flex: 1;
    padding: 80px 0;
  }
  
  .container {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 16px;
  }
  
  .contact-container {
    max-width: 672px;
    margin: 0 auto;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .page-title {
    font-size: clamp(2.5rem, 5vw, 3rem);
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 16px;
    line-height: 1.2;
  }
  
  .page-description {
    font-size: 1.125rem;
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 32px;
  }
  
  .form-container {
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    padding: 32px;
  }
  
  @media (max-width: 768px) {
    .form-container {
      padding: 24px;
    }
  }
  
  .form-group {
    margin-bottom: 24px;
  }
  
  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
  }
  
  .required-mark {
    color: #ef4444;
  }
  
  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s;
    outline: none;
  }
  
  .form-input:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  .form-select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s;
    outline: none;
    background-color: white;
  }
  
  .form-select:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  .form-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s;
    outline: none;
    resize: none;
    font-family: inherit;
  }
  
  .form-textarea:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  .checkbox-group {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  
  .checkbox-input {
    margin-top: 4px;
  }
  
  .checkbox-label {
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.5;
  }
  
  .submit-button {
    width: 100%;
    background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
    color: white;
    font-weight: bold;
    padding: 16px 24px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .submit-button:hover:not(:disabled) {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
  
  .submit-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  .message-card {
    margin-top: 24px;
    padding: 16px;
    border-radius: 8px;
  }
  
  .success-message {
    background-color: #d1fae5;
    border: 1px solid #10b981;
    color: #065f46;
  }
  
  .error-message {
    background-color: #fee2e2;
    border: 1px solid #ef4444;
    color: #991b1b;
  }
  
  .message-content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  
  .message-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }
  
  .success-icon {
    background-color: #10b981;
    color: white;
  }
  
  .message-text {
    font-weight: 600;
    line-height: 1.5;
  }
  
  .info-grid {
    margin-top: 48px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  @media (min-width: 768px) {
    .info-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Webkit系ブラウザ（Chrome, Safari）用 */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #00d084;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #00a86b;
  }

  /* Firefox用 */
  html {
    scrollbar-width: thin;
    scrollbar-color: #00d084 #f1f1f1;
  }
  
  .info-card {
    background-color: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .info-card-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #10b981;
    margin-bottom: 16px;
  }
  
  .info-content {
    color: #374151;
    line-height: 1.6;
  }
  
  .info-content p {
    margin-bottom: 8px;
  }
  
  .info-note {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 8px;
  }
  
  .legal-link {
    color: #10b981;
    text-decoration: underline;
    transition: color 0.2s;
  }
  
  .legal-link:hover {
    color: #059669;
  }
`;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    organization: '',
    message: '',
    privacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Netlify Forms に送信（実際の実装では適切なエンドポイントを使用）
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact-media',
          name: formData.name,
          email: formData.email,
          category: formData.category,
          organization: formData.organization,
          message: formData.message,
          privacy: formData.privacy.toString()
        }).toString()
      });
      
      if (response.ok) {
        setShowSuccess(true);
        setShowError(false);
        setFormData({
          name: '',
          email: '',
          category: '',
          organization: '',
          message: '',
          privacy: false
        });
      } else {
        throw new Error('送信に失敗しました');
      }
    } catch (error) {
      setShowError(true);
      setShowSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="contact-page-container">
        <Header />
        
        <main className="contact-main">
          <div className="container">
            <div className="contact-container">
              
              <div className="page-header">
                <h1 className="page-title">お問い合わせ</h1>
                <p className="page-description">
                  トリフレメディアに関するご質問、ご意見、<br />
                  記事のご要望、取材依頼など、お気軽にお問い合わせください。
                </p>
              </div>

              {/* お問い合わせフォーム */}
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      お名前 <span className="required-mark">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="お名前を入力してください"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      メールアドレス <span className="required-mark">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category" className="form-label">
                      お問い合わせ種別 <span className="required-mark">*</span>
                    </label>
                    <select 
                      id="category" 
                      name="category" 
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="">選択してください</option>
                      <option value="記事について">記事に関するお問い合わせ</option>
                      <option value="記事リクエスト">記事のリクエスト・提案</option>
                      <option value="取材依頼">取材・掲載依頼</option>
                      <option value="広告掲載">広告掲載について</option>
                      <option value="コラボレーション">コラボレーション・提携</option>
                      <option value="サイト不具合">サイトの不具合・技術的問題</option>
                      <option value="プライバシー">プライバシー・個人情報に関して</option>
                      <option value="著作権">著作権・コンテンツに関して</option>
                      <option value="メディア関係">メディア・プレス関係</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="organization" className="form-label">
                      会社名・団体名（企業・団体の方のみ）
                    </label>
                    <input 
                      type="text" 
                      id="organization" 
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="会社名・団体名（任意）"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      お問い合わせ内容 <span className="required-mark">*</span>
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="form-textarea"
                      placeholder="お問い合わせ内容を詳しくご記入ください"
                    />
                  </div>

                  <div className="form-group">
                    <div className="checkbox-group">
                      <input 
                        type="checkbox" 
                        id="privacy" 
                        name="privacy" 
                        checked={formData.privacy}
                        onChange={handleChange}
                        required
                        className="checkbox-input"
                      />
                      <label htmlFor="privacy" className="checkbox-label">
                        <Link href="/privacy" target="_blank" className="legal-link">プライバシーポリシー</Link>
                        に同意します <span className="required-mark">*</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="submit-button"
                  >
                    {isSubmitting ? '送信中...' : '送信する'}
                  </button>
                </form>

                {/* 送信完了メッセージ */}
                {showSuccess && (
                  <div className="message-card success-message">
                    <div className="message-content">
                      <div className="message-icon success-icon">
                        <span style={{ fontSize: '14px' }}>✓</span>
                      </div>
                      <p className="message-text">
                        お問い合わせを受け付けました。<br />
                        通常2営業日以内にご返信いたします。
                      </p>
                    </div>
                  </div>
                )}

                {/* エラーメッセージ */}
                {showError && (
                  <div className="message-card error-message">
                    <p className="message-text">
                      送信に失敗しました。時間をおいて再度お試しください。
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
        
        {/* Netlify Forms用の隠しフォーム */}
        <form name="contact-media" data-netlify="true" data-netlify-honeypot="bot-field" style={{ display: 'none' }}>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="category" />
          <input type="text" name="organization" />
          <textarea name="message"></textarea>
        </form>
      </div>
    </>
  );
}
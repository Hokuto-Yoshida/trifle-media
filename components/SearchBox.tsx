'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBox({ 
  placeholder = "記事検索", 
  className = "" 
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  // 検索候補（実際のプロジェクトでは記事データから生成）
  const searchSuggestions = [
    '一人旅',
    '海外旅行',
    '国内旅行',
    'グルメ',
    '宿泊',
    '京都',
    '沖縄',
    '温泉',
    '女性',
    '安全',
    '準備',
    'コツ',
    '初心者',
    '予算'
  ];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setQuery('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: searchStyles }} />
      <div className={`search-box ${className}`}>
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="search-input"
              onFocus={() => query.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <button type="submit" className="search-button">
              <Search size={18} />
            </button>
          </div>
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Search size={14} />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </form>
      </div>
    </>
  );
}

const searchStyles = `
  .search-box {
    position: relative;
    margin-bottom: 16px;
  }

  .search-form {
    position: relative;
  }

  .search-input-wrapper {
    position: relative;
    display: flex;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    overflow: hidden;
    background: white;
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
    border: none;
    background: #6b7280;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-button:hover {
    background: #4b5563;
  }

  .search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #d1d5db;
    border-top: none;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
  }

  .suggestion-item {
    width: 100%;
    padding: 8px 12px;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #374151;
  }

  .suggestion-item:hover {
    background: #f3f4f6;
  }

  .suggestion-item:last-child {
    border-bottom: none;
  }
`;
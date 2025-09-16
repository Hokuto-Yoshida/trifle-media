# トリフレメディア

Z世代のための一人旅特化メディア「トリフレ」のWebサイト。

## 🎯 概要

トリフレメディアは、一人旅に興味がある若者向けのブログメディアサイトです。
初めての一人旅から海外ビギナー向けまで、安心・安全な旅の情報を提供します。

### 主な機能
- 📝 ブログ記事システム（MDX）
- 🗂️ カテゴリ別記事分類
- 🔍 記事検索機能
- 🔮 旅行診断機能
- 📱 トリフレアプリとの連携
- 🌙 ダークモード対応
- 📱 PWA対応

## 🚀 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **コンテンツ**: MDX
- **アイコン**: Lucide React
- **フォント**: Inter, Noto Sans JP
- **デプロイ**: Vercel

## 📁 プロジェクト構造

```
trifle-media/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # トップページ
│   ├── posts/             # ブログ記事ページ
│   ├── category/          # カテゴリページ
│   ├── search/            # 検索ページ
│   ├── shindan/           # 旅行診断ページ
│   ├── app/               # アプリダウンロードページ
│   ├── api/               # API Routes
│   ├── globals.css        # グローバルスタイル
│   ├── loading.tsx        # ローディングページ
│   ├── not-found.tsx      # 404ページ
│   └── robots.ts          # robots.txt生成
├── components/            # 共通コンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PostCard.tsx
│   ├── CategoryGrid.tsx
│   ├── CTAApp.tsx
│   ├── Analytics.tsx
│   └── providers/
├── lib/                  # ユーティリティ関数
│   ├── posts.ts         # 記事取得関数
│   ├── categories.ts    # カテゴリ管理
│   └── utils.ts         # 共通関数
├── types/               # TypeScript型定義
│   ├── post.ts
│   └── category.ts
├── content/             # MDXコンテンツ
│   └── posts/
├── public/              # 静的ファイル
│   ├── images/
│   ├── icons/
│   └── manifest.json
├── next.config.js       # Next.js設定
├── tailwind.config.js   # Tailwind設定
├── tsconfig.json        # TypeScript設定
├── package.json         # 依存関係
└── README.md
```

## 🛠️ 開発環境セットアップ

### 1. リポジトリのクローン
```bash
git clone https://github.com/your-username/trifle-media.git
cd trifle-media
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 環境変数の設定
```bash
cp .env.example .env.local
```

`.env.local`を編集して必要な環境変数を設定してください。

### 4. 開発サーバーの起動
```bash
npm run dev
```

http://localhost:3000 でアプリケーションが起動します。

## 📝 記事の追加方法

### 1. MDXファイルの作成
`content/posts/`ディレクトリに新しい`.mdx`ファイルを作成します。

```mdx
---
title: "記事のタイトル"
description: "記事の説明文"
date: "2024-03-15"
category: "はじめての一人旅"
tags: ["初心者", "準備"]
thumb: "/images/posts/sample.jpg"
readingTime: 5
author:
  name: "編集部"
  avatar: "/images/authors/editor.jpg"
featured: false
draft: false
---

# 記事の内容

ここに記事の内容を書きます...
```

### 2. 画像の配置
記事で使用する画像は`public/images/posts/`に配置します。

### 3. カテゴリの管理
新しいカテゴリを追加する場合は、`lib/categories.ts`を編集します。

## 🎨 デザインシステム

### カラーパレット
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray
- **Accent**: Purple, Green, Orange

### コンポーネント
- `btn`: ボタンスタイル
- `card`: カードレイアウト
- `grid-responsive`: レスポンシブグリッド

## 📱 PWA機能

このサイトはPWA（Progressive Web App）として動作します：
- オフライン対応
- ホーム画面への追加
- プッシュ通知（将来実装予定）

## 🔍 SEO最適化

- メタデータの自動生成
- 構造化データ対応
- サイトマップ自動生成
- RSS Feed提供
- Open Graph対応

## 📊 アナリティクス

Google Analyticsが設定されています。
`NEXT_PUBLIC_GA_ID`環境変数にトラッキングIDを設定してください。

## 🚀 デプロイ

### Vercelでのデプロイ
1. Vercelアカウントでリポジトリを連携
2. 環境変数を設定
3. 自動デプロイが開始されます

### 手動デプロイ
```bash
npm run build
npm run start
```

## 📈 パフォーマンス

- Next.js 14のApp Routerによる最適化
- 画像の自動最適化
- 静的生成によるSEO向上
- Tailwind CSSによる軽量化

## 🤝 コントリビューション

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 📞 お問い合わせ

- Website: https://media.trifle.jp
- Email: contact@trifle.jp
- Twitter: [@trifle_media](https://twitter.com/trifle_media)

---

**Made with ❤️ for travelers**
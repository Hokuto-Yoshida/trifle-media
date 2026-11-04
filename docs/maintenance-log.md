# 保守作業ログ

新しい作業を先頭に追記する。各回の最後に「次回候補」を更新する。

## 次回候補

- **トルコ記事のリラ建て料金**（turkey-bursa-solo-1night-2days-complete-guide-2026 ほか）：為替注記はあるが、インフレでリラ建て料金自体が古い。ケーブルカー等の公式料金を確認
- **韓国記事の為替**（korea-female-solo-travel-2025 / korea-male-solo-travel-2025）：1KRW=0.11円（実勢0.119円、ずれ-7.6%で閾値未満のため据え置き）。次回ずれが8%を超えたら換算を更新
- **エジプト記事の残り**（egypt-solo-travel-guide-2025）：公式サイトで確認できなかったアスワン・ハイダム（160 EGP）、ツアー・クルーズ・航空料金は旧値のまま。冒頭の「2025年9月現在、外務省は主要観光地を危険レベル1」も外務省の現行の危険情報と照合する。大エジプト博物館（GEM）の外国人料金は公式（visit-gem.com）が自動取得を拒否したため未掲載
- **韓国ビューティー記事の空港リムジンバス料金**（korea-beauty-solo-travel-2025）：片道8,000 KRW表記は実勢より安い可能性。公式（KAL Limousine等）で確認
- 為替チェック用の考え方：`1<通貨>=<数値>円` / `JPY` 表記を全記事から抽出し、open.er-api.com と fawazahmed0/currency-api の2ソースで比較。範囲表記や「〜」区切りは抽出漏れがあるので正規表現を広げる
- エジプトの遺跡料金は egymonuments.gov.eg の各ページ「Tickets」欄が一次情報（トップはJS描画だが、個別ページはcurlで取得可。一覧は POST /umbraco/api/MapsWebAPI/GetAllMapPins で取れる）
- ボリビア・アルゼンチンは変動相場・高インフレのため円換算の全面書き換えはせず注記で対応した。現地料金が一次情報で取れたら本文を更新

## 2026-11-04：エジプト記事の入場料・為替更新＋韓国ビューティー記事の予算表整合

### やったこと
- **egypt-solo-travel-guide-2025**：主要遺跡・博物館14か所の外国人料金をエジプト観光・考古省公式（egymonuments.gov.eg、各ページのTickets欄）で確認して更新（ギザ遺跡群540→700、大ピラミッド内部900→1,000、エジプト考古学博物館450→550、シタデル180→550、王家の谷450→750、ツタンカーメン王墓900→700、ハトシェプスト270→440、ルクソール270→500、カルナック270→600、エドフ270→550、コム・オンボ270→450、フィラエ540→550、アブ・シンベル540+270→750（2/22・10/22は1,200）、エレファンティネ270→200、ヌビア博物館270→400 EGP）。スフィンクスの別料金（公式ではエリア入場券に含む）と、公式に存在しない「ツタンカーメンのマスク特別室500 EGP」を削除し、ツタンカーメン秘宝のGEM移設を注記。オーディオガイドを公式の75 EGPに修正
- 同記事の円換算を1EGP=3.11円→2.85円（2026年11月3〜4日、open.er-api.com 2.855円 / fawazahmed0 2.847円）で53か所再計算。タイトルに予算額があるため「予算25万円の詳細内訳」は据え置き、旧レート・入場料値上げの注記を追加
- 同記事のカイロ地下鉄運賃「全線均一6 EGP」→ 10〜20 EGP（2026年3月改定、カイロ県公式ニュース cairo.gov.eg で確認）
- **egypt-solo-travel-winter-packing-guide-2025**：為替「1USD=約30EGP / 1EGP=約5円」→「約55EGP / 約2.85円」。根拠のないミネラルウォーター価格（0.5-1EGP）を削除
- **korea-beauty-solo-travel-2025**：予算内訳の地下鉄を1,500→1,550 KRW（×10回=約1,820円）、朝食の掛け算ミス（2,520→2,820円）を修正。内訳を積み上げると約7.6万円になる旨と7万円に収める方法を注記
- 3記事の lastmod と最終更新日（情報確認日）を 2026-11-04 に更新

### 確認結果
- `npm run build` 成功。out/ で3記事の title・本文（新料金・新レート・注記）・dateModified=2026-11-04・PR表記を確認
- netlify.toml は変更なし

## 2026-10-28：為替レートのずれ修正（8%以上）＋ソウル地下鉄運賃の更新

### やったこと
全記事の「1通貨=○円」表記を抽出し、2026年10月27〜28日の実勢レート（open.er-api.com と fawazahmed0/currency-api の2ソースで一致を確認。ボリビアはボリビア中央銀行の公定レート 1USD=12.02BOB を確認）と比較。ずれが8%以上の記事を修正した。

- **本文の円換算を現地通貨価格から再計算**（タイトルに予算額がある記事は予算内訳表を据え置き、「旧レートで試算・現在は◯割上振れ」の注記を追加）
  - brunei-solo-travel-3nights-4days-complete-guide-2025：1BND 108円→123円、本文換算21か所
  - colombia-female-solo-travel-guide-2025：1COP 0.035円→0.050円、本文換算26か所
  - macau-solo-travel-guide-2025：1MOP 17.8円→19.5円、本文換算15か所
  - jakarta-solo-travel-guide-2025：1IDR 0.0097円→0.0087円、本文換算18か所（到着ビザ50万ルピアは現行のまま、2026年8月の値上げ案を注記）
- **為替レート行の更新＋注記**（本文換算は既に現行レート相当、または予算表据え置き）
  - asia-solo-local-food-guide-2025（MYR 33→39円ほか4通貨）、barcelona-winter-solo-travel-2025（1EUR 160→176円）、geneva-solo-travel-guide-2026・switzerland-zurich-solo-travel-4nights-6days-budget-350k-2026（1CHF 172→190円）、colombia-medellin-solo-female-complete-guide-2026（1COP 0.038→0.050円）、jakarta-bali-year-end-solo-guide-2025（1IDR 0.0096→0.0087円）、korea-solo-travel-cost-2025（1KRW 0.107→0.119円）
- **変動相場・高インフレ通貨は注記で対応**
  - bolivia-solo-travel-2025・bolivia-uyuni-solo-female-complete-guide-2026：2026年6月の変動相場制移行（BCB）を明記、1BOB≒13円に更新
  - argentina-solo-travel-guide-2025・argentina-buenos-aires-solo-travel-4nights-6days-budget-200k-2026：1ARS 0.14〜0.15円→0.10円
- **ソウル地下鉄の初乗り運賃**：2025年6月28日に1,400→1,550ウォン（交通カード）へ値上げ済みなのに旧料金のままだった5記事を修正（korea-christmas / korea-female / korea-male / korea-beauty / korea-solo-travel-cost）。korea-female の「T-moneyで約10%割引」という誤記も修正
- 変更した19記事の lastmod を 2026-10-28 に更新（なかった3記事は追加）。情報確認日がある記事は、何を再確認したかを併記して更新

### 確認結果
- `npm run build` 成功。out/ で brunei・bolivia・colombia-medellin・korea-christmas の title・本文・dateModified を確認
- netlify.toml は変更なし

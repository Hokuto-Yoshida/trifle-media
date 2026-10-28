# 保守作業ログ

新しい作業を先頭に追記する。各回の最後に「次回候補」を更新する。

## 次回候補

- **エジプト記事の料金・為替更新**（egypt-solo-travel-guide-2025）：本文は1EGP=3.11円で換算（2026年10月は約2.82円、ずれ+10%）。ただしギザのピラミッド等の入場料（EGP建て）自体が古い可能性が高いので、エジプト観光・考古省の公式料金を確認してから円換算を直す（換算だけ下げると実態より安く見えてしまう）
- **トルコ記事のリラ建て料金**（turkey-bursa-solo-1night-2days-complete-guide-2026 ほか）：為替注記はあるが、インフレでリラ建て料金自体が古い。ケーブルカー等の公式料金を確認
- **韓国記事の為替**（korea-female-solo-travel-2025 / korea-male-solo-travel-2025）：1KRW=0.11円（実勢0.119円、ずれ-7.6%で今回は閾値未満のため据え置き）。次回ずれが8%を超えたら換算を更新
- **ソウル地下鉄 旧運賃**：korea-beauty-solo-travel-2025 の予算内訳（1,500 KRW×10回=1,600円）が計算・料金とも不正確。予算表の整合を取る
- 為替チェック用の考え方：`1<通貨>=<数値>円` / `JPY` 表記を全記事から抽出し、open.er-api.com と fawazahmed0/currency-api の2ソースで比較した。範囲表記（0.107〜0.108円など）や「〜」区切りの金額は抽出漏れがあるので次回は正規表現を広げる
- ボリビア・アルゼンチンは変動相場・高インフレのため円換算の全面書き換えはせず注記で対応した。現地料金が一次情報で取れたら本文を更新

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

// トリフレアプリのストアリンク。placement はサイト内の設置場所（流入元の計測用）
const APP_STORE_URL = 'https://apps.apple.com/jp/app/torifure/id6753066712';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.torifure.app';

// App Store Connect のキャンペーンリンク用プロバイダトークン（pt）。空のままでも ct は付くが、計測には pt が必要
const APP_STORE_PROVIDER_TOKEN = '';

export function appStoreUrl(placement: string): string {
  const params = new URLSearchParams({ ct: `torifure-web-${placement}`, mt: '8' });
  if (APP_STORE_PROVIDER_TOKEN) params.set('pt', APP_STORE_PROVIDER_TOKEN);
  return `${APP_STORE_URL}?${params.toString()}`;
}

export function googlePlayUrl(placement: string): string {
  const referrer = `utm_source=torifure.com&utm_medium=web&utm_campaign=${placement}`;
  return `${GOOGLE_PLAY_URL}&referrer=${encodeURIComponent(referrer)}`;
}

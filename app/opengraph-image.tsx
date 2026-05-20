import { ImageResponse } from 'next/og';

export const alt = 'トリフレメディア - 若者のための一人旅特化メディア';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  let fontData: ArrayBuffer | null = null;
  try {
    const res = await fetch(
      'https://fonts.gstatic.com/s/notosansjp/v53/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.woff2',
      { cache: 'force-cache' }
    );
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      // HTMLが返された場合（'<'で始まる）はフォントとして使わない
      const first = new Uint8Array(buffer.slice(0, 1));
      if (first[0] !== 0x3c) {
        fontData = buffer;
      }
    }
  } catch {
    // Japanese font unavailable; fall back to system sans-serif
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #00d084 0%, #009960 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: fontData ? 'NotoSansJP' : 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.8)',
            marginBottom: 16,
            letterSpacing: '0.15em',
          }}
        >
          TORIFURE MEDIA
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: 'white',
            marginBottom: 20,
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          トリフレメディア
        </div>
        <div
          style={{
            fontSize: 30,
            color: 'rgba(255,255,255,0.92)',
            marginBottom: 44,
          }}
        >
          若者のための一人旅特化メディア
        </div>
        <div
          style={{
            display: 'flex',
            gap: 28,
            background: 'rgba(255,255,255,0.18)',
            padding: '14px 32px',
            borderRadius: 50,
            color: 'white',
            fontSize: 22,
          }}
        >
          <span>320記事以上</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>国内・海外</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>一人旅専門</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontData
        ? [{ name: 'NotoSansJP', data: fontData, weight: 700, style: 'normal' }]
        : [],
    }
  );
}

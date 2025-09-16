import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  try {
    const posts = await getAllPosts();
    const baseUrl = 'https://media.trifle.jp';
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>トリフレメディア</title>
    <description>Z世代のための一人旅特化メディア「トリフレ」。初めての一人旅から海外ビギナー向けまで、安心・安全な旅の情報をお届けします。</description>
    <link>${baseUrl}</link>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>editor@trifle.jp (トリフレメディア編集部)</managingEditor>
    <webMaster>webmaster@trifle.jp (トリフレメディア)</webMaster>
    <category>Travel</category>
    <category>Solo Travel</category>
    <category>Japan</category>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/images/logo.png</url>
      <title>トリフレメディア</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${posts
      .slice(0, 20) // 最新20件
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>editor@trifle.jp (${post.author.name})</author>
      <category>${post.category}</category>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('')}
      <enclosure url="${baseUrl}${post.thumb}" type="image/jpeg"/>
      <content:encoded><![CDATA[
        <p>${post.description}</p>
        <p><img src="${baseUrl}${post.thumb}" alt="${post.title}" style="max-width: 100%; height: auto;" /></p>
        <p><a href="${baseUrl}/posts/${post.slug}">続きを読む →</a></p>
      ]]></content:encoded>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
import { Metadata } from 'next';

const DEFAULT_TITLE = 'Minwook BLOG';
const DEFAULT_DESC = 'Notion API Blog';
const DEFAULT_AUTHOR = 'Minwook';
const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const DEFAULT_ICON_URL = '/image/icon-16px.png';
// const DEFAULT_KEYWORD = 'Next.js, React, Typescript, Twailwindcss, Notion API, swr, pretendard';
// const DEFAULT_IMAGE = `/api/og?title=${encodeURIComponent(DEFAULT_TITLE)}`;
// const pageTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
// const pageDesc = description ?? DEFAULT_DESC;
// const siteURL = process.env.NEXT_PUBLIC_SITE_URL;
// const pageKeywords = keywords ? `${keywords}, ${DEFAULT_KEYWORD}` : DEFAULT_KEYWORD;
// const pageImage = `${siteURL}${image ?? DEFAULT_IMAGE}`;
// const pageURL = `${siteURL}${asPath}`;

export const DEFALUT_METADATA: Metadata = {
  icons: { icon: DEFAULT_ICON_URL, apple: DEFAULT_ICON_URL },
  title: { default: DEFAULT_TITLE, template: `%s | ${DEFAULT_TITLE}` },
  description: DEFAULT_DESC,
  authors: [{ name: DEFAULT_AUTHOR }],
  metadataBase: new URL(DEFAULT_SITE_URL),
  alternates: {
    canonical: DEFAULT_SITE_URL, //SEO 중복서치 방지
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    url: DEFAULT_SITE_URL,
    siteName: DEFAULT_TITLE,
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    site: DEFAULT_AUTHOR,
    creator: DEFAULT_AUTHOR,
    description: DEFAULT_DESC,
  },
};

import { Metadata } from 'next';

const DEFAULT_TITLE = 'Minwook BLOG';
const DEFAULT_DESC = 'Notion API Blog';
const DEFAULT_AUTHOR = 'Minwook';
const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
// const DEFAULT_KEYWORD = 'Next.js, React, Typescript, Twailwindcss, Notion API, swr, pretendard';
// const DEFAULT_IMAGE = `/api/og?title=${encodeURIComponent(DEFAULT_TITLE)}`;
// const pageTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
// const pageDesc = description ?? DEFAULT_DESC;
// const siteURL = process.env.NEXT_PUBLIC_SITE_URL;
// const pageKeywords = keywords ? `${keywords}, ${DEFAULT_KEYWORD}` : DEFAULT_KEYWORD;
// const pageImage = `${siteURL}${image ?? DEFAULT_IMAGE}`;
// const pageURL = `${siteURL}${asPath}`;

export const DEFALUT_METADATA: Metadata = {
  title: { default: DEFAULT_TITLE, template: `%s | ${DEFAULT_TITLE}` },
  description: DEFAULT_DESC,
  authors: [{ name: DEFAULT_AUTHOR }],
  metadataBase: new URL(DEFAULT_SITE_URL),
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    url: DEFAULT_SITE_URL,
    type: 'website',
    siteName: DEFAULT_TITLE,
    locale: 'ko_KR',
  },
  alternates: {
    canonical: DEFAULT_SITE_URL, //SEO 중복서치 방지
  },
};

import getConfig from 'next/config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Analytics from '@/components/layout/Analytics';

const {
  publicRuntimeConfig: { SITE_URL },
} = getConfig();

const DEFAULT_TITLE = 'Minwook BLOG';
const DEFAULT_DESC = 'Notion API Blog';
const DEFAULT_KEYWORD = 'Next.js, React, Typescript, Twailwindcss, Notion API, swr, pretendard';
const DEFAULT_IMAGE = `/api/og?title=${encodeURIComponent(DEFAULT_TITLE)}`;
const DEFAULT_AUTHOR = 'Minwook';

interface PageHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const PageHead = ({ title, description, image, keywords }: PageHeadProps) => {
  const { asPath } = useRouter();
  const pageTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const pageDesc = description ?? DEFAULT_DESC;
  const pageKeywords = keywords ? `${keywords}, ${DEFAULT_KEYWORD}` : DEFAULT_KEYWORD;
  const pageImage = `${SITE_URL}${image ?? DEFAULT_IMAGE}`;
  const pageURL = `${SITE_URL}${asPath}`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={DEFAULT_AUTHOR} />
      {/* 컨텐츠 중복방지 */}
      <link rel="canonical" href={pageURL} />
      {/* OG */}
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:url" content={pageURL} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:desciption" content={pageDesc} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="640" />
      <meta property="og:image:height" content="425" />
      <meta property="og:image:alt" content={pageTitle} />
      {/* twitter */}
      <meta property="twitter:card" content={pageDesc} />
      <meta property="twitter:site" content={DEFAULT_AUTHOR} />
      <meta property="twitter:creator" content={DEFAULT_AUTHOR} />
      <meta property="twitter:description" content={pageDesc} />
      <meta property="twitter:image" content={pageImage} />
      <meta property="twitter:image:alt" content={pageTitle} />
      <Analytics />
    </Head>
  );
};

export default PageHead;

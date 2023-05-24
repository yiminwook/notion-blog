'use client';

import Head from 'next/head';
import Analytics from '@/components/layout/Analytics';

interface PageHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const PageHead = ({ title, description, image, keywords }: PageHeadProps) => {
  return (
    <Head>
      {/* <title>{pageTitle}</title> */}
      {/* <meta name="description" content={pageDesc} /> */}
      {/* <meta name="keywords" content={pageKeywords} /> */}
      {/* <meta name="author" content={DEFAULT_AUTHOR} /> */}
      {/* 컨텐츠 중복방지 */}
      {/* <link rel="canonical" href={pageURL} /> */}
      {/* OG */}
      {/* <meta property="og:locale" content="ko_KR" /> */}
      {/* <meta property="og:url" content={pageURL} /> */}
      {/* <meta property="og:type" content="website" />`` */}
      {/* <meta property="og:title" content={pageTitle} /> */}
      {/* <meta property="og:site_name" content={pageTitle} /> */}
      {/* <meta property="og:desciption" content={pageDesc} /> */}
      {/* <meta property="og:image" content={pageImage} /> */}
      {/* <meta property="og:image:width" content="640" /> */}
      {/* <meta property="og:image:height" content="425" /> */}
      {/* <meta property="og:image:alt" content={pageTitle} /> */}
      {/* twitter */}
      {/* <meta property="twitter:card" content={pageDesc} /> */}
      {/* <meta property="twitter:site" content={DEFAULT_AUTHOR} /> */}
      {/* <meta property="twitter:creator" content={DEFAULT_AUTHOR} /> */}
      {/* <meta property="twitter:description" content={pageDesc} /> */}
      {/* <meta property="twitter:image" content={pageImage} /> */}
      {/* <meta property="twitter:image:alt" content={pageTitle} /> */}
      <Analytics />
    </Head>
  );
};

export default PageHead;

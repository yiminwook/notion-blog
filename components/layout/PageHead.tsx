'use Client';

import Head from 'next/head';
import Analytics from '@/components/layout/Analytics';

interface PageHeadProps {}

const PageHead = ({}: PageHeadProps) => {
  return (
    // <Head>
    <Analytics />
    //</Head>
  );
};

export default PageHead;

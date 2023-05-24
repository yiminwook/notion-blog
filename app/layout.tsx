import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { PropsWithChildren } from 'react';

// react-notion-x
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

import 'pretendard/dist/web/variable/pretendardvariable.css';
import '@/styles/globals.css';
import '@/styles/notionStyle.scss';
import PageHead from '@/components/layout/PageHead';
import { DEFALUT_METADATA } from '@/consts/headConst';
import { PAGE_REVALIDATE_TIME } from '@/consts';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <PageHead />
      <body>
        <Header />
        <main className="max-w-5xl min-h-[calc(100vh-4.5rem-5.5rem)] w-full mx-auto lg:w-4/5 lg:px-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;

/** Default Route Segment Config */
export const metadata = DEFALUT_METADATA;
export const revalidate = PAGE_REVALIDATE_TIME;
export const dynamicParams = 'blocking'; //fallback

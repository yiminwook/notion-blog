import type { AppProps } from 'next/app';
import RootLayout from '@/components/layout/RootLayout';

// react-notion-x
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

// tailwind
import 'pretendard/dist/web/variable/pretendardvariable.css';
import '@/styles/globals.css';
import '@/styles/notionStyle.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};

export default App;

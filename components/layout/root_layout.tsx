import { PropsWithChildren } from 'react';
import Footer from './footer';
import Header from './header';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4.5rem-5.5rem)]">{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;

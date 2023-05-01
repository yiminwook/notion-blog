import { PropsWithChildren } from 'react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="max-w-5xl min-h-[calc(100vh-4.5rem-5.5rem)] w-full mx-auto lg:w-4/5 lg:px-auto">{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;

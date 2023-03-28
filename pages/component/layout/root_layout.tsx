import { ReactNode } from "react";
import Header from "./header";

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
};

export default RootLayout;

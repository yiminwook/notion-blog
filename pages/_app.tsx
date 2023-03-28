import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "./component/layout/root_layout";
import "pretendard/dist/web/variable/pretendardvariable.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

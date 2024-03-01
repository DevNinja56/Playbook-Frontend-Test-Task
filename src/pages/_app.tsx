import MainLayout, { propType } from "@/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const componentLayout = (Component as any).layout as propType;
  return (
    <MainLayout {...componentLayout}>
      <Component {...pageProps} />
    </MainLayout>
  );
}

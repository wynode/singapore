import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </ThemeProvider>
  );
}

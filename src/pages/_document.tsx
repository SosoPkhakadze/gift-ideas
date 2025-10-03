// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-dark-mode-black dark:bg-dark-mode-black dark:text-white font-lato">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
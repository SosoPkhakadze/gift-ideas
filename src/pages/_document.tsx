import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        {/* Your SEO Meta Tags remain here */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Find the perfect gift with AI-powered suggestions. GiftAdvisor helps you discover personalized gifts for any occasion." />
        <meta name="keywords" content="gift ideas, gift finder, AI gifts, personalized gifts, gift suggestions, birthday gifts, anniversary gifts" />
        {/* ... other meta tags ... */}
      </Head>
      {/* This class applies the 'Inter' font we defined in tailwind.config.ts */}
      <body className="font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
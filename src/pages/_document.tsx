import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Find the perfect gift with AI-powered suggestions. Gift Ideas helps you discover personalized gifts for any occasion." />
        <meta name="keywords" content="gift ideas, gift finder, AI gifts, personalized gifts, gift suggestions, birthday gifts, anniversary gifts" />
        <meta name="author" content="Gift Ideas" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:title" content="Gift Ideas - Find The Perfect Gift with AI" />
        <meta property="og:description" content="Let our magical AI guide you to the best gift ideas tailored perfectly for your loved ones" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yourdomain.com/" />
        <meta property="twitter:title" content="Gift Ideas - Find The Perfect Gift with AI" />
        <meta property="twitter:description" content="Let our magical AI guide you to the best gift ideas tailored perfectly for your loved ones" />
        <meta property="twitter:image" content="https://yourdomain.com/og-image.jpg" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Gift Ideas',
              url: 'https://yourdomain.com',
              description: 'AI-powered gift suggestion platform',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://yourdomain.com/gift-finder?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        
        {/* Fonts are loaded via CSS @import in globals.css */}
      </Head>
      <body className="bg-white text-gray-900 dark:bg-dark-mode-black dark:text-white font-lato antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
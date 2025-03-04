import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Michael Liav</title>
        {/* Favicon for all browsers */}
        <link rel="icon" href="/cartoon_me.webp" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/cartoon_me.webp" />
        <link rel="icon" type="image/png" sizes="16x16" href="/cartoon_me.webp" />

        {/* Apple Touch Icon (for iPhones/iPads) */}
        <link rel="apple-touch-icon" sizes="180x180" href="/cartoon_me.webp" />

        {/* Meta for theme color */}
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

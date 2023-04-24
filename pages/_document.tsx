import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3019938220049179"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body>
        <Script src="https://adm.shinobi.jp/s/e53d8d64dbcb566bff8cc21525a343af"></Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

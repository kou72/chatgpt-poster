import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🤖</text></svg>"
        />
        <meta property="og:title" content="ChatGpt Poster" />
        <meta
          property="og:description"
          content="ChatGPT APIをWEBから使えるサイトです。プロンプト作りのお供に"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/kou72/chatgpt-poster/main/public/chatgptposter.png"
        />
      </Head>
      <body>
        <Script src="https://adm.shinobi.jp/s/e53d8d64dbcb566bff8cc21525a343af"></Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

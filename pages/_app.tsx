import '@/styles/globals.css'
import 'github-markdown-css/github-markdown-dark.css'
import '@/styles/custom-github-markdown.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

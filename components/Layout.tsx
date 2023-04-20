import Header from './Header'
import Sidebar from './Sidebar'
import Head from 'next/head'

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Head>
        <title>Chat-GPT Poster</title>
      </Head>
      <Header />
      <div className="flex min-h-screen">
        <div className="w-2/12">
          <Sidebar />
        </div>
        <div className="w-10/12">
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}

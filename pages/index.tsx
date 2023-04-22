import Head from 'next/head'
import { SystemTextArea } from '@/components/SystemTextArea'
import { UserTextArea } from '@/components/UserTextArea'
import { PresentChats } from '@/components/PresentChats'
import { Response } from '@/components/Response'
import { Layout } from '@/components/Layout'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

const Home = () => {
  return (
    <>
      <Head>
        <title>Chat-GPT Poster</title>
      </Head>
      <Layout
        hedaer={<Header />}
        sidebar={<Sidebar />}
        topLeft={<SystemTextArea />}
        topRight={<PresentChats />}
        bottomLeft={<UserTextArea />}
        bottomRight={<Response />}
      />
    </>
  )
}

export default Home

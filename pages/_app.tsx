import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./global.css";
import type { AppProps } from 'next/app'

import { SessionProvider } from "next-auth/react"

import ResponsiveAppBar from '../components/ResponsiveAppBar';

import Head from 'next/head'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>StvGoDigital</title>
        <meta name="description" content="Portal de StvGoDigital" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveAppBar />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App

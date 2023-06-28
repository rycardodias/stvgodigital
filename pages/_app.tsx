import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./global.css";
import type { AppProps } from 'next/app'


import ResponsiveAppBar from '../components/ResponsiveAppBar';

import Head from 'next/head'
import ClientSession from 'components/ClientSession';
import Link from 'next/link';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  return (
    <ClientSession>
      {(...clientSession: any) => {
        let session = clientSession[0]
        return (
          <>
            <Head>
              <title>StvGoDigital</title>
              <meta name="description" content="Portal de StvGoDigital" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <ResponsiveAppBar session={session} />
            {session.error ?
              <Link href="/login">Login</Link>
              : (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Component {...pageProps} session={session} />
                </LocalizationProvider>
              )
            }


          </>
        )
      }}
    </ClientSession>
  )
}

export default App

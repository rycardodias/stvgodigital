import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./global.css";
import type { AppProps } from 'next/app'

import { SessionProvider } from "next-auth/react"

import ResponsiveAppBar from '../components/ResponsiveAppBar';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ResponsiveAppBar />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default App

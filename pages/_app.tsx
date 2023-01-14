import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./global.css";
import type { AppProps } from 'next/app'

import ResponsiveAppBar from '../components/ResponsiveAppBar';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ResponsiveAppBar />
      <Component {...pageProps} />
    </>
  )
}

export default App

import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'

import sendRequest from "../lib/requests"

export default function Home() {
  const { t, lang } = useTranslation('common')

  sendRequest('/users/login', 'POST', { email: 'rycardo.dias@hotmail.com', password: 'Lol123!!' })

  return (
    <>
      <Head>
        <title>{t('AppTitle')}</title>
        <meta name="description" content="Portal de StvGoDigital" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>

  )
}

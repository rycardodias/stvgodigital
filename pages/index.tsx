import Head from 'next/head'

import useTranslation from 'next-translate/useTranslation'


export default function Home() {
  const { t, lang } = useTranslation('common')

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

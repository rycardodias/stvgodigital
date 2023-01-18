import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'

import sendRequest from "../lib/requests"

export default function Login() {
  const { t, lang } = useTranslation('common')

  sendRequest('/users/login', 'POST', { email: 'rycardo.dias@hotmail.com', password: 'Lol123!!' })

  return (
    <>
        sss
    </>

  )
}
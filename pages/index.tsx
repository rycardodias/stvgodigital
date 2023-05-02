import { Fragment } from 'react'
import TextField from '@mui/material/TextField'
import Map from 'components/Map';
import useTranslation from 'next-translate/useTranslation';

type SessionProps = {
  session: any;
}


export default function Home({ session }: SessionProps) {
  const { t, lang } = useTranslation('common')

  const markers = [
    { lat: 41.6946, lng: -8.83016 },
    { lat: 41.6946, lng: -8 },
    { lat: 41.1, lng: -8.83016 },
  ];

  return (
    <Fragment>
      <TextField id="lote" label={t('lote')} />
      <Map markers={markers} />
    </Fragment>
  )
}

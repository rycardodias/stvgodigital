

type SessionProps = {
  session: any;
}
import Map from 'components/Map';

export default function Home({ session }: SessionProps) {
  // const { t, lang } = useTranslation('common')

  const markers = [
    { lat: 41.6946, lng: -8.83016 },
    { lat: 41.6, lng: -8.83016 },
  ];

  return (
    <Map markers={markers} />
  )
}

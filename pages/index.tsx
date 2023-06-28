import { Fragment, useState, useEffect } from 'react'
import Map from 'components/Map';
import useTranslation from 'next-translate/useTranslation';
import { MapArcType, MapNodeType } from 'interfaces/MapsCoordinates';
import sendRequest from 'lib/requests';

type SessionProps = {
  session: any;
}

export default function Home({ session }: SessionProps) {
  const { t, lang } = useTranslation('common')

  const [markers, setMarkers] = useState<Array<MapNodeType>>([])
  const [arcs, setArcs] = useState<Array<MapArcType>>([])

  useEffect(() => {
    // Fetch data from API and set the state
    const fetchData = async () => {
      const response = await sendRequest('/onchain/channel/batch/graphMapMode')

      if (response.error) return

      const data: any = response.data

      setMarkers(data.nodes)

      setArcs(data.arcs)
    };
    fetchData();
  }, []);

  const handleSearchClick = (batchID: string) => {

    const fetchData = async () => {
      const response = await sendRequest('/onchain/channel/batch/graphMapModeID/' + batchID)

      if (response.error) return

      const data: any = response.data

      setMarkers(data.nodes)

      setArcs(data.arcs)
    };

    fetchData();
  }

  return (
    <Fragment>
      {/* <TextField id="lote" label={t('lote')} /> */}
      <Map markers={markers} arcs={arcs} searchBatchClick={handleSearchClick} />
    </Fragment>
  )
}

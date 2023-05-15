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

  // const [markers, setMarkers] = useState<Array<MapNodeType>>([])
  // const [arcs, setArcs] = useState<Array<MapArcType>>([])

  // const [loading, setLoading] = useState(true)


  const [markers, setMarkers] = useState<Array<MapNodeType>>([])
  const [arcs, setArcs] = useState<Array<MapArcType>>([])

  useEffect(() => {
    // Fetch data from API and set the state
    const fetchData = async () => {
      const response = await sendRequest('/onchain/channel/batch/graphMapMode')

      if (response.error) return

      const data: any = response.data

      console.log(data)

      // data.nodes.forEach((element: any) => {

      //   setMarkers(prevMarkers => [...prevMarkers,
      //   {
      //     ID: element.ID,
      //     docType: element.docType,
      //     lat: element.mapInfo.coordinates.lat //+ (Math.random() - 0.5) * 0.6,
      //     lng: element.mapInfo.coordinates.lng //+ (Math.random() - 0.5) * 0.6
      //   }]);
      // });

      setMarkers(data.nodes)

      setArcs(data.arcs)

      // data.arcs.forEach((element: any) => {
      //   setArcs(prevArcs => [...prevArcs,
      //     element
      //   ]);
      // });


      // let arcArray: Array<MapArcType> = []

      // data.arcs.forEach(async (element: any) => {
      //   let arcObj: MapArcType = { ID: '', graphsInfo: { initialNode: '', finalNode: '' } };

      //   switch (element.docType) {
      //     case "rg":
      //       arcObj = {
      //         // ID: element.ID,
      //         ...element,
      //         graphsInfo: {
      //           initialNode: Object.keys(element.newBatch || {})[0],
      //           finalNode: Object.keys(element.newBatch || {})[0],
      //         }
      //       };
      //       arcArray.push(arcObj)
      //       break;
      //     case 'rc':
      //       arcObj = {
      //         ...element,
      //         graphsInfo: {
      //           initialNode: Object.keys(element.receivedBatch || {})[0],
      //           finalNode: Object.keys(element.newBatch || {})[0],
      //         }
      //       };
      //       arcArray.push(arcObj)
      //       break;
      //     case "p":
      //       Object.keys(element.inputBatches || {}).forEach(key => {
      //         arcObj = {
      //           ...element,
      //           ID: element.ID + '-' + key + '-' + element.outputBatch,
      //           graphsInfo: {
      //             initialNode: key,
      //             finalNode: element.outputBatch,
      //           }
      //         };
      //         arcArray.push(arcObj)
      //       });
      //       break;
      //     case 't':
      //       arcObj = {
      //         ...element,
      //         graphsInfo: {
      //           initialNode: Object.keys(element.inputBatch || {})[0],
      //           finalNode: Object.keys(element.inputBatch || {})[0], // FIXME: calcular o final Node
      //         }
      //       };
      //       arcArray.push(arcObj)
      //       break;
      //     default:
      //       console.error("Unknown type: " + element.docType);
      //   }


      // });

      // setArcs(arcArray);
    };

    fetchData();

  }, []);

  return (
    <Fragment>
      {/* <TextField id="lote" label={t('lote')} /> */}
      <Map markers={markers} arcs={arcs} />
    </Fragment>
  )
}

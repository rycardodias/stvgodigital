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

  const dataObject = {
    "nodes": [
      {
        "docType": "b",
        "ID": "b-43-leftover",
        "batchType": "YARN",
        "latestOwner": "InovafilMSP:PU1",
        "batchInternalID": "b-43-iid",
        "supplierID": "suppl-001",
        "isInTransit": false,
        "quantity": 100,
        "finalScore": -3,
        "batchComposition": {
          "organic_cotton": 50,
          "polyamide6": 50
        },
        "lat": 41.691143633035104,
        "lng": -8.83016
      },
      {
        "ID": "b-41",
        "batchComposition": {
          "organic_cotton": 100
        },
        "batchInternalID": "b-41-iid",
        "batchType": "ORGANIC_COTTON",
        "docType": "b",
        "finalScore": -3,
        "isInTransit": false,
        "latestOwner": "InovafilMSP:PU1",
        "quantity": 100,
        "supplierID": "suppl-001",
        "lat": 41.68452629101537,
        "lng": -8.83016
      },
      {
        "ID": "b-42",
        "batchComposition": {
          "polyamide6": 100
        },
        "batchInternalID": "b-42-iid",
        "batchType": "POLYAMIDE_6",
        "docType": "b",
        "finalScore": -3,
        "isInTransit": false,
        "latestOwner": "InovafilMSP:PU1",
        "quantity": 100,
        "supplierID": "suppl-001",
        "lat": 41.72269204864218,
        "lng": -8.83016
      },
      {
        "docType": "b",
        "ID": "b-47",
        "batchType": "PES_RPET",
        "latestOwner": "TintexMSP:PU1",
        "batchInternalID": "b-47-iid",
        "supplierID": "suppl-003",
        "isInTransit": false,
        "quantity": 50,
        "finalScore": -3,
        "batchComposition": {
          "black_dye": 100
        },
        "lat": 41.10148929516075,
        "lng": -8.83016
      },
      {
        "docType": "b",
        "ID": "b-50",
        "batchType": "GARMENT",
        "latestOwner": "TMGMSP:PU1",
        "batchInternalID": "b-50-iid",
        "supplierID": "suppl-006",
        "isInTransit": false,
        "quantity": 50,
        "finalScore": 2,
        "batchComposition": {
          "organic_cotton": 67,
          "polyamide6": 33
        },
        "lat": 41.01441687200322,
        "lng": -8
      },
      {
        "ID": "b-49",
        "batchComposition": {
          "organic_cotton": 67,
          "polyamide6": 33
        },
        "batchInternalID": "b-49-iid",
        "batchType": "DYED_FABRIC",
        "docType": "b",
        "finalScore": 2,
        "isInTransit": false,
        "latestOwner": "TMGMSP:PU1",
        "quantity": 50,
        "supplierID": "suppl-004",
        "lat": 40.99149926067418,
        "lng": -8
      },
      {
        "ID": "b-48",
        "batchComposition": {
          "organic_cotton": 67,
          "polyamide6": 33
        },
        "batchInternalID": "b-48-iid",
        "batchType": "DYED_FABRIC",
        "docType": "b",
        "finalScore": 2,
        "isInTransit": true,
        "latestOwner": "TintexMSP:PU1",
        "quantity": 50,
        "supplierID": "suppl-004",
        "lat": 41.11401458295081,
        "lng": -8.83016
      },
      {
        "ID": "b-46",
        "batchComposition": {
          "organic_cotton": 67,
          "polyamide6": 33
        },
        "batchInternalID": "b-46-iid",
        "batchType": "RAW_FABRIC",
        "docType": "b",
        "finalScore": 2,
        "isInTransit": false,
        "latestOwner": "TintexMSP:PU1",
        "quantity": 50,
        "supplierID": "suppl-002",
        "lat": 41.05121319711815,
        "lng": -8.83016
      },
      {
        "ID": "b-45",
        "batchComposition": {
          "organic_cotton": 67,
          "polyamide6": 33
        },
        "batchInternalID": "b-45-iid",
        "batchType": "RAW_FABRIC",
        "docType": "b",
        "finalScore": 2,
        "isInTransit": true,
        "latestOwner": "ASampaioMSP:PU1",
        "quantity": 50,
        "supplierID": "suppl-002",
        "lat": 41.69327485197059,
        "lng": -8
      },
      {
        "ID": "b-44",
        "batchComposition": {
          "organic_cotton": 50,
          "polyamide6": 50
        },
        "batchInternalID": "b-44-iid",
        "batchType": "YARN",
        "docType": "b",
        "finalScore": -3,
        "isInTransit": false,
        "latestOwner": "ASampaioMSP:PU1",
        "quantity": 100,
        "supplierID": "suppl-001",
        "lat": 41.65948460596785,
        "lng": -8
      },
      {
        "ID": "b-43",
        "batchComposition": {
          "organic_cotton": 50,
          "polyamide6": 50
        },
        "batchInternalID": "b-43-iid",
        "batchType": "YARN",
        "docType": "b",
        "finalScore": -3,
        "isInTransit": true,
        "latestOwner": "InovafilMSP:PU1",
        "quantity": 100,
        "supplierID": "suppl-001",
        "lat": 41.67044218985992,
        "lng": -8.83016
      }
    ],
    "arcs": [
      {
        "ID": "rg-41",
        "activityDate": "2023-05-06T13:43:48.531Z",
        "docType": "rg",
        "issuer": "x509::CN=admin,OU=client::CN=ca.inovafil.stvgd.com,O=inovafil.stvgd.com,L=San Francisco,ST=California,C=US",
        "newBatch": {
          "b-41": 100
        },
        "productionUnitID": "InovafilMSP:PU1"
      },
      {
        "ID": "rg-42",
        "activityDate": "2023-05-06T13:43:55.412Z",
        "docType": "rg",
        "issuer": "x509::CN=admin,OU=client::CN=ca.inovafil.stvgd.com,O=inovafil.stvgd.com,L=San Francisco,ST=California,C=US",
        "newBatch": {
          "b-42": 100
        },
        "productionUnitID": "InovafilMSP:PU1"
      },
      {
        "ID": "p-41",
        "activityEndDate": "2023-05-06T13:44:08.532Z",
        "activityStartDate": "2022-09-12T11:45:26.371Z",
        "docType": "p",
        "inputBatches": {
          "b-41": 100,
          "b-42": 100
        },
        "issuer": "x509::CN=admin,OU=client::CN=ca.inovafil.stvgd.com,O=inovafil.stvgd.com,L=San Francisco,ST=California,C=US",
        "outputBatch": "b-43",
        "productionScore": -1,
        "productionType": "SPINNING",
        "productionUnitID": "InovafilMSP:PU1",
        "ses": -9
      },
      {
        "ID": "rg-43",
        "activityDate": "2023-05-06T13:46:09.433Z",
        "docType": "rg",
        "issuer": "x509::CN=admin,OU=client::CN=ca.tintex.stvgd.com,O=tintex.stvgd.com,L=San Francisco,ST=California,C=US",
        "newBatch": {
          "b-47": 100
        },
        "productionUnitID": "TintexMSP:PU1"
      },
      {
        "ID": "t-41",
        "activityDate": "2023-05-06T13:44:14.419Z",
        "destinationProductionUnitID": "ASampaioMSP:PU1",
        "docType": "t",
        "inputBatch": {
          "b-43": 100
        },
        "isReturn": false,
        "issuer": "x509::CN=admin,OU=client::CN=ca.inovafil.stvgd.com,O=inovafil.stvgd.com,L=San Francisco,ST=California,C=US",
        "originProductionUnitID": "InovafilMSP:PU1",
        "transportationType": "TERRESTRIAL_SMALL"
      },
      {
        "ID": "rc-41",
        "activityDate": "2023-05-06T13:45:02.638Z",
        "distance": 150,
        "docType": "rc",
        "isAccepted": true,
        "issuer": "x509::CN=admin,OU=client::CN=ca.asampaio.stvgd.com,O=asampaio.stvgd.com,L=San Francisco,ST=California,C=US",
        "newBatch": {
          "b-44": 100
        },
        "productionUnitID": "ASampaioMSP:PU1",
        "receivedBatch": {
          "b-43": 100
        },
        "ses": -3,
        "transportScore": -7
      },
      {
        "ID": "p-42",
        "activityEndDate": "2023-05-06T13:45:08.346Z",
        "activityStartDate": "2022-09-12T11:45:26.371Z",
        "docType": "p",
        "inputBatches": {
          "b-44": 100
        },
        "issuer": "x509::CN=admin,OU=client::CN=ca.asampaio.stvgd.com,O=asampaio.stvgd.com,L=San Francisco,ST=California,C=US",
        "outputBatch": "b-45",
        "productionScore": -5,
        "productionType": "WEAVING",
        "productionUnitID": "ASampaioMSP:PU1",
        "ses": 2
      },
      {
        "ID": "t-42",
        "activityDate": "2023-05-06T13:45:14.046Z",
        "destinationProductionUnitID": "TintexMSP:PU1",
        "docType": "t",
        "inputBatch": {
          "b-45": 50
        },
        "isReturn": false,
        "issuer": "x509::CN=admin,OU=client::CN=ca.asampaio.stvgd.com,O=asampaio.stvgd.com,L=San Francisco,ST=California,C=US",
        "originProductionUnitID": "ASampaioMSP:PU1",
        "transportationType": "TERRESTRIAL_BIG"
      },
      {
        "ID": "rc-42",
        "activityDate": "2023-05-06T13:46:03.593Z",
        "distance": 150,
        "docType": "rc",
        "isAccepted": true,
        "issuer": "x509::CN=admin,OU=client::CN=ca.tintex.stvgd.com,O=tintex.stvgd.com,L=San Francisco,ST=California,C=US",
        "newBatch": {
          "b-46": 50
        },
        "productionUnitID": "TintexMSP:PU1",
        "receivedBatch": {
          "b-45": 50
        },
        "ses": -3,
        "transportScore": -7
      },
      {
        "ID": "p-43",
        "activityEndDate": "2023-05-06T13:46:15.187Z",
        "activityStartDate": "2022-09-12T11:45:26.371Z",
        "docType": "p",
        "inputBatches": {
          "b-46": 50,
          "b-47": 50
        },
        "issuer": "x509::CN=admin,OU=client::CN=ca.tintex.stvgd.com,O=tintex.stvgd.com,L=San Francisco,ST=California,C=US",
        "outputBatch": "b-48",
        "productionScore": -5,
        "productionType": "DYEING_FINISHING",
        "productionUnitID": "TintexMSP:PU1",
        "ses": 2
      },
      {
        "ID": "t-43",
        "activityDate": "2023-05-06T13:46:20.237Z",
        "destinationProductionUnitID": "TMGMSP:PU1",
        "docType": "t",
        "inputBatch": {
          "b-48": 50
        },
        "isReturn": false,
        "issuer": "x509::CN=admin,OU=client::CN=ca.tintex.stvgd.com,O=tintex.stvgd.com,L=San Francisco,ST=California,C=US",
        "originProductionUnitID": "TintexMSP:PU1",
        "transportationType": "TERRESTRIAL_BIG"
      },
      {
        "ID": "rc-43",
        "activityDate": "2023-05-06T13:47:08.738Z",
        "distance": 150,
        "docType": "rc",
        "isAccepted": true,
        "issuer": "x509::CN=admin,OU=client::CN=ca.tmg.stvgd.com,O=tmg.stvgd.com,L=San Francisco,ST=California,C=US",
        "newBatch": {
          "b-49": 50
        },
        "productionUnitID": "TMGMSP:PU1",
        "receivedBatch": {
          "b-48": 50
        },
        "ses": -3,
        "transportScore": -7
      },
      {
        "ID": "p-44",
        "activityEndDate": "2023-05-06T13:47:14.576Z",
        "activityStartDate": "2022-09-16T11:45:26.371Z",
        "docType": "p",
        "inputBatches": {
          "b-49": 50
        },
        "issuer": "x509::CN=admin,OU=client::CN=ca.tmg.stvgd.com,O=tmg.stvgd.com,L=San Francisco,ST=California,C=US",
        "outputBatch": "b-50",
        "productionScore": -5,
        "productionType": "CONFECTION",
        "productionUnitID": "TMGMSP:PU1",
        "ses": 10
      }
    ]
  }


  const [markers, setMarkers] = useState<Array<MapNodeType>>([])
  const [arcs, setArcs] = useState<Array<MapArcType>>([])

  useEffect(() => {
    // Fetch data from API and set the state
    const fetchData = async () => {
      const response = await sendRequest('/onchain/channel/batch/graphMode')
      // const response = await fetch('https://example.com/api/data');
      // const data = await response.json();
      if (response.error) return

      const data: any = response.data
      data.nodes.forEach((element: any) => {
        setMarkers(prevMarkers => [...prevMarkers,
        {
          ID: element.ID,
          lat: element.lat + (Math.random() - 0.5) * 0.3,
          lng: element.lng + (Math.random() - 0.5) * 0.3
        }]);
      });

      let arcArray: Array<MapArcType> = []

      data.arcs.forEach(async (element: any) => {
        let arcObj: MapArcType = { ID: '', graphsInfo: { initialNode: '', finalNode: '' } };

        switch (element.docType) {
          case "rg":
            arcObj = {
              // ID: element.ID,
              ...element,
              graphsInfo: {
                initialNode: Object.keys(element.newBatch || {})[0],
                finalNode: Object.keys(element.newBatch || {})[0],
              }
            };
            arcArray.push(arcObj)
            break;
          case 'rc':
            arcObj = {
              ...element,
              graphsInfo: {
                initialNode: Object.keys(element.receivedBatch || {})[0],
                finalNode: Object.keys(element.newBatch || {})[0],
              }
            };
            arcArray.push(arcObj)
            break;
          case "p":
            Object.keys(element.inputBatches || {}).forEach(key => {
              arcObj = {
                ...element,
                ID: element.ID + '-' + key + '-' + element.outputBatch,
                graphsInfo: {
                  initialNode: key,
                  finalNode: element.outputBatch,
                }
              };
              arcArray.push(arcObj)
            });
            break;
          case 't':
            arcObj = {
              ...element,
              graphsInfo: {
                initialNode: Object.keys(element.inputBatch || {})[0],
                finalNode: Object.keys(element.inputBatch || {})[0], // FIXME: calcular o final Node
              }
            };
            arcArray.push(arcObj)
            break;
          default:
            console.error("Unknown type: " + element.docType);
        }


      });

      setArcs(arcArray);
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

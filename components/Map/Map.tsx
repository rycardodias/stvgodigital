import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline, Popup, LayersControl } from 'react-leaflet'
import { icon } from 'leaflet'
import { MapNodeType, MapArcType } from 'interfaces/MapsCoordinates';
import { Fragment, useState } from 'react';
import { Button } from '@mui/material';
import { MapPopupHandler } from './MapPopupHandler';
import TextField from '@mui/material/TextField';
import useTranslation from 'next-translate/useTranslation'

const icons: { [id: string]: any } = {
    rg:
        icon({
            iconUrl: "/registration.png",
            iconSize: [32, 32],
        }),
    rc:
        icon({
            iconUrl: "/reception.png",
            iconSize: [32, 32],
        }),
    t:
        icon({
            iconUrl: "/transport.png",
            iconSize: [32, 32],
        }),
    p:
        icon({
            iconUrl: "/production.png",
            iconSize: [32, 32],
        }),
    b:
        icon({
            iconUrl: "/batch.png",
            iconSize: [32, 32],
        }),
}

type MapProps = {
    markers: Array<MapNodeType>
    arcs: Array<MapArcType>
    searchBatchClick: any
}



const Map = ({ markers, arcs, searchBatchClick }: MapProps) => {
    const { t, lang } = useTranslation('common')
    const [showBatches, setshowBatches]: Array<any> = useState([])
    const [selectedItem, setSelectedItem]: any = useState('')
    const [inputValue, setInputValue] = useState('');

    return (
        <Fragment>

            <MapContainer center={[41.6946, -8.83016]} zoom={8} scrollWheelZoom={false} style={{ height: "90vh" }}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.length > 0 && markers.map(item => {
                    if (item.docType === "b" && !showBatches.includes(item.ID)) return
                    return (

                        <Marker key={item.ID} position={[item.mapInfo.coordinates.lat, item.mapInfo.coordinates.lng]} icon={icons[item.docType]}
                            eventHandlers={{
                                click: (e) => {
                                    if (item.docType === "b") return

                                    // if (item.ID === selectedItem) {
                                    //     setSelectedItem('')
                                    //     setshowBatches([])
                                    // } else {
                                    //     setshowBatches([])
                                    //     // setshowBatches((prevBatches: any) => prevBatches.concat(item.mapInfo.input, item.mapInfo.output));
                                    //     setSelectedItem(item.ID)
                                    // }

                                }
                            }}>
                            <MapPopupHandler item={item} />
                        </Marker>
                    )
                })
                }
                {arcs.length > 0 && arcs.map(arc => {

                    if (arc.activityConnection) {
                        return (
                            <Polyline key={arc.ID} color='blue'
                                positions={
                                    [
                                        arc.initialNode,
                                        arc.finalNode
                                    ]}
                            >
                            </Polyline >
                        )
                    }
                })
                }
            </MapContainer >

            <div
                style={{
                    position: 'absolute',
                    top: '15vh',
                    right: '2vw',
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    zIndex: 10000,
                    
                }}
            >
                <TextField
                    id="search-batch-tf"
                    label={t('batch')}
                    variant="standard"
                    style={{
                        width: '5rem', // Adjust the width as per your requirement
                        marginBottom: '0.5rem',
                        fontSize: '0.5rem',
                        marginRight: '1rem', // Increase the margin value for more spacing
                    }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                    variant="outlined"
                    style={{
                        minWidth: '2rem',
                        height: '2.5rem',
                        fontSize: '0.8rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',

                    }}
                    onClick={() => searchBatchClick(inputValue)}
                >
                    {t('search')}
                </Button>
            </div>
        </Fragment>
    )
}
export default Map

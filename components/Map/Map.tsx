import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl } from 'react-leaflet'
import { icon } from 'leaflet'
import { MapNodeType, MapArcType } from 'interfaces/MapsCoordinates';
import { Fragment, useState } from 'react';
import { Button } from '@mui/material';
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
}

const Map = ({ markers, arcs }: MapProps) => {

    const [showBatches, setshowBatches]: Array<any> = useState([])
    const [selectedItem, setSelectedItem]: string = useState('')

    return (

        <MapContainer center={[41.6946, -8.83016]} zoom={8} scrollWheelZoom={false} style={{ height: "89vh" }}>

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
                                // const closest = getSegment(e.latlng, e.sourceTarget);
                                // setResults([...results, closest]);
                                // console.log(item)
                                if(item.ID === selectedItem) {
                                    setSelectedItem('')
                                    setshowBatches([])
                                } else {
                                    setshowBatches([])
                                    setshowBatches((prevBatches: any) => prevBatches.concat(item.mapInfo.input, item.mapInfo.output));
                                    setSelectedItem(item.ID)
                                }
                                
                            }
                        }}>
                        <Popup>
                            {item.ID}
                        </Popup>
                    </Marker>
                )
            })
            }
            {arcs.length > 0 && arcs.map(arc => {

                if (!arc.activityConnection) {

                    if ((showBatches.includes(arc.finalNode.ID) && arc.initialNode.ID === selectedItem) ||
                        showBatches.includes(arc.initialNode.ID) && arc.finalNode.ID === selectedItem) { //showBatches.includes(arc.initialNode.ID) ||
                        
                        return (
                            <Polyline key={arc.ID} color='black'
                                positions={
                                    [
                                        arc.initialNode,
                                        arc.finalNode
                                    ]}
                                eventHandlers={{
                                    click: (e) => {
                                        // const closest = getSegment(e.latlng, e.sourceTarget);
                                        // setResults([...results, closest]);
                                        console.log(arc.ID)
                                    }
                                }}
                            >
                            </Polyline >
                        )

                    }
                    return

                } else {
                    return (
                        <Polyline key={arc.ID} color='blue'
                            positions={
                                [
                                    arc.initialNode,
                                    arc.finalNode
                                ]}
                            eventHandlers={{
                                click: (e) => {
                                    // const closest = getSegment(e.latlng, e.sourceTarget);
                                    // setResults([...results, closest]);
                                    console.log(arc.ID)
                                }
                            }}
                        >
                        </Polyline >
                    )
                }
            })
            }
        </MapContainer >
    )
}
export default Map

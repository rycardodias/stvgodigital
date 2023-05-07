import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { icon } from 'leaflet'
import { MapNodeType, MapArcType } from 'interfaces/MapsCoordinates';

const ICON = icon({
    iconUrl: "/flags.png",
    iconSize: [32, 32],
})

type MapProps = {
    markers: Array<MapNodeType>
    arcs: Array<MapArcType>
}

const Map = ({ markers, arcs }: MapProps) => {

    return (
        <MapContainer center={[41.6946, -8.83016]} zoom={8} scrollWheelZoom={false} style={{ height: "89vh" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.length > 0 && markers.map(item => {
                return (
                    <Marker key={item.ID} position={[item.lat, item.lng]} icon={ICON}>
                        <Popup>
                            {item.ID}
                        </Popup>
                    </Marker>
                )
            })
            }
            {arcs.length > 0 && arcs.map(arc => {
                const initialNode = markers.find(marker => marker.ID === arc.graphsInfo.initialNode) || { ID: '', lat: 0, lng: 0 }
                const finalNode = markers.find(marker => marker.ID === arc.graphsInfo.finalNode) || { ID: '', lat: 0, lng: 0 }

                return (
                    <Polyline key={arc.ID} color='black'
                        positions={
                            [
                                { lat: initialNode.lat, lng: initialNode.lng },
                                { lat: finalNode.lat, lng: finalNode.lng }
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
            })
            }
        </MapContainer >
    )
}
export default Map

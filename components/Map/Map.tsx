import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

import { icon } from 'leaflet'
import MapsCoordinates from 'interfaces/MapsCoordinates';

const ICON = icon({
    iconUrl: "/flags.png",
    iconSize: [32, 32],
})

type MapProps = {
    markers: Array<MapsCoordinates>
}



const Map = ({ markers }: MapProps) => {

    return (
        <MapContainer center={[41.6946, -8.83016]} zoom={8} scrollWheelZoom={false} style={{ height: "89vh" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.length && markers.map(item => {
                return (
                    <Marker position={[item.lat, item.lng]} icon={ICON}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                )
            })}
            <Polyline color='pink' 
                positions={markers.map(item => {
                    return [item.lat, item.lng]
                })} />
        </MapContainer>
    )
}

export default Map

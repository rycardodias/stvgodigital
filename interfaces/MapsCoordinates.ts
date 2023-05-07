interface MapsCoordinates {
    lat: number;
    lng: number;
}

export interface MapNodeType extends MapsCoordinates {
    ID: string;
}

export interface MapArcType {
    ID: string;
    graphsInfo: {
        initialNode: string;
        finalNode: string;
    }

}
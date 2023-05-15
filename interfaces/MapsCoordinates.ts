interface MapsCoordinates {
    lat: number;
    lng: number;
}

export interface MapNodeType extends MapsCoordinates {
    ID: string;
    docType: string,
    mapInfo: any
}

export interface MapArcType {
    ID: string;
    activityConnection: boolean;
    initialNode: any;
    finalNode: any;
}
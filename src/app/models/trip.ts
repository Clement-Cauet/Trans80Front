import { Route } from './route';

export class Trip {
    id!: {
        agencyId: string;
        id: string;
    };
    route!: Route;
    serviceId!: {
        agencyId: string;
        id: string;
    };
    tripShortName?: string;
    tripHeadsign?: string;
    routeShortName?: string;
    directionId?: string;
    blockId?: string;
    shapeId?: {
        agencyId: string;
        id: string;
    };
    wheelchairAccessible?: number;
    bikesAllowed?: number;

    constructor(data: Partial<Trip>) {
        Object.assign(this, data);
    }
}
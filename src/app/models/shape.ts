export class Shape {
    id!: number;
    shapeId!: {
        agencyId: string;
        id: string;
    };
    sequence!: number;
    lat!: number;
    lon!: number;
    distTraveled!: number;
    distTraveledSet!: boolean;
    proxy?: {
        shapeId: {
            agencyId: string;
            id: string;
        };
        sequence: number;
        distTraveledSet: boolean;
        distTraveled: number;
        lat: number;
        lon: number;
        id: number;
    };

    constructor(data: Partial<Shape>) {
        Object.assign(this, data);
    }
}
export class Stop {
    id!: {
        agencyId: string;
        id: string;
    };
    name!: string;
    lat!: number;
    lon!: number;
    code?: string;
    desc?: string;
    zoneId?: string;
    url?: string;
    locationType?: number;
    parentStation?: string;
    wheelchairBoarding?: number;
    direction?: string;
    timezone?: string;
    vehicleType?: number;
    platformCode?: string;
    vehicleTypeSet?: boolean;

    constructor(data: Partial<Stop>) {
        Object.assign(this, data);
    }
}
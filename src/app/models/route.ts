export class Route {
    id!: {
        agencyId: string;
        id: string;
    };
    agency?: {
        id: string;
        name: string;
        url: string;
        timezone: string;
        lang: string;
        phone: string;
        fareUrl: string;
    };
    shortName?: string;
    longName?: string;
    type?: number;
    desc?: string;
    url?: string;
    color?: string;
    textColor?: string;
    bikesAllowed?: number;
    sortOrder?: number;
    sortOrderSet?: boolean;

    constructor(data: Partial<Route>) {
        Object.assign(this, data);
    }
}
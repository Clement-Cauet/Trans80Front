export class Agency {
    id!: string;
    name!: string;
    url!: string;
    timezone!: string;
    lang!: string;
    phone!: string;
    fareUrl!: string;

    constructor(data: Partial<Agency>) {
        Object.assign(this, data);
    }
}
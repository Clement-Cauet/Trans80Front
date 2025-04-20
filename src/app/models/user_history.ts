export class UserHistory {
    id?: Number;
    userId?: string;
    tripId?: string;
    date?: Date;

    constructor(data: Partial<UserHistory>) {
        Object.assign(this, data);
    }
}
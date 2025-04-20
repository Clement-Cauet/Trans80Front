export class UserHistory {
    id?: Number;
    user_id?: string;
    trips_id?: string;
    reserved_date?: Date;
    created_at?: Date;

    constructor(data: Partial<UserHistory>) {
        Object.assign(this, data);
    }
}
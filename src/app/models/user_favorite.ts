export class UserFavorite {
    id?: Number;
    user_id?: string;
    trips_id?: string;

    constructor(data: Partial<UserFavorite>) {
        Object.assign(this, data);
    }
}
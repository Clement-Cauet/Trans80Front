export class UserFavorite {
    id?: Number;
    userId?: string;
    tripId?: string;

    constructor(data: Partial<UserFavorite>) {
        Object.assign(this, data);
    }
}
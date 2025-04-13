export class User {
    sub?: string;
    email_verified?: boolean;
    name?: string;
    preferred_username?: string;
    given_name?: string;
    family_name?: string;
    email?: string;
    accessToken?: string;

    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }
}
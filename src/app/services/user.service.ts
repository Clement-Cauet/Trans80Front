import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserHistory } from '../models/user_history';
import { UserFavorite } from '../models/user_favorite';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private apiService: ApiService) {}

    getUserHistory(): Promise<UserHistory[]> {
        return this.apiService.getUserHistory();
    }

    addUserHistory(userHistory: UserHistory): Promise<UserHistory> {
        return this.apiService.addUserHistory(userHistory);
    }

    getUserFavorites(): Promise<UserFavorite[]> {
        return this.apiService.getUserFavorites();
    }

    addUserFavorite(userFavorite: UserFavorite): Promise<UserFavorite> {
        return this.apiService.addUserFavorite(userFavorite);
    }
}
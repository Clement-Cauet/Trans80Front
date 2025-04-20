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

    isFavorite(tripId: string): Promise<boolean> {
        return this.getUserFavorites().then(favorites => {
            return favorites.some(favorite => favorite.trips_id === tripId);
        });
    }

    getUserFavorites(): Promise<UserFavorite[]> {
        return this.apiService.getUserFavorites();
    }

    addUserFavorite(userFavorite: UserFavorite): Promise<UserFavorite> {
        return this.apiService.addUserFavorite(userFavorite);
    }

    deleteUserFavorite(userFavorite: UserFavorite): Promise<UserFavorite> {
        return this.apiService.deleteUserFavorite(userFavorite);
    }
}
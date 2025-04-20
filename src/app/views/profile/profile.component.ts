import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { FavoriteItemComponent } from '../../components/favorite-item/favorite-item.component';
import { HistoryItemComponent } from '../../components/history-item/history-item.component';
import { UserFavorite } from '../../models/user_favorite';
import { UserHistory } from '../../models/user_history';
import { UserService } from '../../services/user.service';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    FormsModule,
    FavoriteItemComponent,
    HistoryItemComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  isAuthenticated: boolean = false;
  user: User = new User({});
  favorites: { favorite: UserFavorite, trip: Trip | null }[] = [];
  histories: { history: UserHistory, trip: Trip | null }[] = [];

  constructor(private authService: AuthService, private userService: UserService, private tripService: TripService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = true;
      this.user = this.authService.user;
      this.loadFavorites();
      this.loadHistories();
      console.log('User:', this.user.accessToken);
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  loadFavorites() {
    this.userService.getUserFavorites().then(favorites => {
      const favoritePromises = favorites.map(favorite =>
        this.tripService.getTripById(favorite.trips_id!).then(trip => ({favorite, trip}))
      );
      Promise.all(favoritePromises).then(favoritesWithTrips => {
        this.favorites = favoritesWithTrips;
        console.log('Favorites with trips:', this.favorites);
      });
    }).catch(error => {
      console.error('Error loading favorites:', error);
    });
  }

  loadHistories() {
    this.userService.getUserHistory().then(histories => {
      const historyPromises = histories.map(history =>
        this.tripService.getTripById(history.trips_id!).then(trip => ({history, trip}))
      );
      Promise.all(historyPromises).then(historiesWithTrips => {
        this.histories = historiesWithTrips;
        console.log('Histories with trips:', this.histories);
      });
    }).catch(error => {
      console.error('Error loading histories:', error);
    });
  }

}

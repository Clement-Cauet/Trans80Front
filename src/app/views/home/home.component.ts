import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { TripService } from '../../services/trip.service';
import { UserFavorite } from '../../models/user_favorite';
import { Trip } from '../../models/trip';
import { CommonModule } from '@angular/common';
import { FavoriteItemComponent } from '../../components/favorite-item/favorite-item.component';
import { MapComponent } from "../../components/map/map.component";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FavoriteItemComponent,
    MapComponent
],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  user: User = new User({});
  favorites: { favorite: UserFavorite, trip: Trip | null }[] = [];

  constructor(private authService: AuthService, private userService: UserService, private tripService: TripService) { }
  
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.user = this.authService.user;
      this.loadFavorites();
    }
  }

  loadFavorites() {
    this.userService.getUserFavorites().then(favorites => {
      const favoritePromises = favorites.map(favorite =>
        this.tripService.getTripById(favorite.trips_id!).then(trip => ({favorite, trip}))
      );
      Promise.all(favoritePromises).then(favoritesWithTrips => {
        this.favorites = favoritesWithTrips;
      });
    }).catch(error => {
      console.error('Error loading favorites:', error);
    });
  }

}

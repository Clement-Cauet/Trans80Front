import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../models/trip';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserHistory } from '../../models/user_history';
import { UserFavorite } from '../../models/user_favorite';

@Component({
  selector: 'app-trip-modal',
  imports: [
    CommonModule,
  ],
  templateUrl: './trip-modal.component.html',
  styleUrl: './trip-modal.component.css'
})
export class TripModalComponent {
  @Input() trip!: Trip;
  @Input() date!: string;
  @Output() close = new EventEmitter<void>();

  isFavorite: boolean = false;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.checkIfFavorite();
    }
  }

  checkIfFavorite() {
    this.userService.isFavorite(this.trip.id.id).then(state => {
      this.isFavorite = state;
    }).catch(error => {
      console.error('Error checking favorite status:', error);
    });
  }

  toggleFavorite() {
    if (this.authService.isAuthenticated()) {
      if (this.isFavorite) {
        this.userService.getUserFavorites().then(favorites => {
          const favoriteToDelete = favorites.find(fav => fav.trips_id === this.trip.id.id);
          if (favoriteToDelete) {
            this.userService.deleteUserFavorite(favoriteToDelete).then(() => {
              console.log('Favorite removed successfully');
              this.isFavorite = false;
            }).catch(error => {
              console.error('Failed to remove favorite:', error);
            });
          }
        });
      } else {
        const userFavorite = new UserFavorite({ user_id: this.authService.user.sub, trips_id: this.trip.id.id });
        this.userService.addUserFavorite(userFavorite).then(() => {
          console.log('Favorite added successfully');
          this.isFavorite = true;
        }).catch(error => {
          console.error('Failed to add favorite:', error);
        });
      }
    }
  }

  toogleReservation() {
    if (this.authService.isAuthenticated()) {
      const userHistory = new UserHistory({ user_id: this.authService.user.sub, trips_id: this.trip.id.id, reserved_date: new Date(this.date), created_at: new Date() });

      this.userService.addUserHistory(userHistory).then((response) => {
        console.log('Reservation added to user history:', response);
        this.close.emit();
      }).catch((error) => {
        console.error('Failed to add reservation to user history:', error);
      });
    }
  }
}
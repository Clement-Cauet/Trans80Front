import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from '../../models/trip';
import { UserService } from '../../services/user.service';
import { UserHistory } from '../../models/user_history';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-trip-modal',
  templateUrl: './trip-modal.component.html',
  styleUrl: './trip-modal.component.css'
})
export class TripModalComponent {
  @Input() trip!: Trip;
  @Output() close = new EventEmitter<void>();

  constructor(private userService: UserService, private authService: AuthService) { }

  toggleFavorite() {
    console.log('Favorite toggled for trip:', this.trip.id.id);
    this.close.emit();
  }

  toogleReservation() {
    if (this.authService.isAuthenticated()) {
      const userHistory = new UserHistory({ userId: this.authService.user.sub, tripId: this.trip.id.id, date: new Date() });

      this.userService.addUserHistory(userHistory).then((response) => {
        console.log('Reservation added to user history:', response);
        this.close.emit();
      }).catch((error) => {
        console.error('Failed to add reservation to user history:', error);
      });
    }
  }
}
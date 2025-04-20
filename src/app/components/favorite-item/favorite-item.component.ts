import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripModalComponent } from '../trip-modal/trip-modal.component';
import { UserFavorite } from '../../models/user_favorite';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-favorite-item',
  imports: [
    CommonModule,
    TripModalComponent
  ],
  templateUrl: './favorite-item.component.html',
  styleUrl: './favorite-item.component.css'
})
export class FavoriteItemComponent {
  @Input() favorite!: {favorite: UserFavorite, trip: Trip | null};

  isModalOpen: boolean = false;

  openModal(event: Event) {
    event.stopPropagation();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
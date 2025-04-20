import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripModalComponent } from '../trip-modal/trip-modal.component';
import { UserFavorite } from '../../models/user_favorite';

@Component({
  selector: 'app-favorite-item',
  imports: [
    CommonModule,
  ],
  templateUrl: './favorite-item.component.html',
  styleUrl: './favorite-item.component.css'
})
export class FavoriteItemComponent {
  @Input() favorite!: UserFavorite;
}
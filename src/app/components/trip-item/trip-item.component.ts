import { Component, Input } from '@angular/core';
import { Trip } from '../../models/trip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-item',
  imports: [
    CommonModule
  ],
  templateUrl: './trip-item.component.html',
  styleUrl: './trip-item.component.css'
})
export class TripItemComponent {
  @Input() trip!: Trip;

  onClick() {
    // Handle click event
  }
}

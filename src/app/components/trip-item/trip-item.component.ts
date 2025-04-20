import { Component, HostListener, Input } from '@angular/core';
import { Trip } from '../../models/trip';
import { CommonModule } from '@angular/common';
import { StopTimeItemComponent } from "../stop-time-item/stop-time-item.component";
import { StopTime } from '../../models/stop_time';
import { StopTimeService } from '../../services/stop_time.service';
import { TripModalComponent } from '../trip-modal/trip-modal.component';

@Component({
  selector: 'app-trip-item',
  imports: [
    CommonModule,
    StopTimeItemComponent,
    TripModalComponent
  ],
  templateUrl: './trip-item.component.html',
  styleUrl: './trip-item.component.css'
})
export class TripItemComponent {
  @Input() trip!: Trip;
  @Input() date!: string;

  stopTimes: StopTime[] = [];
  isExpanded: boolean = false;
  isModalOpen: boolean = false;

  constructor(private stopTimeService: StopTimeService) { }

  onClick() {
    if (!this.isExpanded) {
      this.stopTimeService.getStopTimes({ tripId: this.trip.id.id, date: this.date }).then(stopTimes => {
        this.stopTimes = stopTimes;
      });
    }
    this.isExpanded = !this.isExpanded;
  }

  openModal(event: Event) {
    event.stopPropagation();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
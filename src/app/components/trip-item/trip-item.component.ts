import { Component, Input } from '@angular/core';
import { Trip } from '../../models/trip';
import { CommonModule } from '@angular/common';
import { StopTimeItemComponent } from "../stop-time-item/stop-time-item.component";
import { StopTime } from '../../models/stop_time';
import { StopTimeService } from '../../services/stop_time.service';

@Component({
  selector: 'app-trip-item',
  imports: [
    CommonModule,
    StopTimeItemComponent
  ],
  templateUrl: './trip-item.component.html',
  styleUrl: './trip-item.component.css'
})
export class TripItemComponent {
  @Input() trip!: Trip;
  @Input() date!: string;

  stopTimes: StopTime[] = [];
  isExpanded: boolean = false;

  constructor(private stopTimeService: StopTimeService) { }

  onClick() {
    if (!this.isExpanded) {
      this.stopTimeService.getStopTimes({ tripId: this.trip.id.id, date: this.date }).then(stopTimes => {
        this.stopTimes = stopTimes;
      });
    }
    this.isExpanded = !this.isExpanded;
  }
}
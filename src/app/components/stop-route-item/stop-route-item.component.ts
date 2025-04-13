import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StopTimeService } from '../../services/stop_time.service';
import { StopTime } from '../../models/stop_time';
import { Route } from '../../models/route';
import { StopTimeItemComponent } from '../stop-time-item/stop-time-item.component';
import { TimeFormatPipe } from "../../pipes/format-time.pipe";

@Component({
  selector: 'app-stop-route-item',
  imports: [
    CommonModule,
    TimeFormatPipe
],
  templateUrl: './stop-route-item.component.html',
  styleUrl: './stop-route-item.component.css'
})
export class StopRouteItemComponent {
  @Input() route!: Route;
  @Input() stopId!: string;
  @Input() date!: string;

  stopTimesDirection0: StopTime[] = [];
  stopTimesDirection1: StopTime[] = [];
  isExpanded: boolean = false;

  constructor(private stopTimeService: StopTimeService) { }

  onClick() {
    if (!this.isExpanded) {
      this.stopTimeService.getStopTimes({routeId: this.route.id.id, stopId: this.stopId, date: this.date, directionId: "0"}).then(stopTimes => {
        this.stopTimesDirection0 = stopTimes;
      });

      this.stopTimeService.getStopTimes({routeId: this.route.id.id, stopId: this.stopId, date: this.date, directionId: "1"}).then(stopTimes => {
        this.stopTimesDirection1 = stopTimes;
      });
    }
    this.isExpanded = !this.isExpanded;
  }
}

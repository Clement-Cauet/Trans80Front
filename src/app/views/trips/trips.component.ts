import { Component, OnInit, Output } from '@angular/core';
import { Trip } from '../../models/trip';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { SearchbarComponent } from "../../components/searchbar/searchbar.component";
import { TripItemComponent } from "../../components/trip-item/trip-item.component";
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { StopTimeService } from '../../services/stop_time.service';
import { StopTime } from '../../models/stop_time';
import { StopTimeItemComponent } from "../../components/stop-time-item/stop-time-item.component";
import { MapComponent } from '../../components/map/map.component';
import { Shape } from '../../models/shape';
import { Stop } from '../../models/stop';
import { ShapeService } from '../../services/shape.service';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    CommonModule,
    SearchbarComponent,
    TripItemComponent,
    StopTimeItemComponent,
    MapComponent
],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit {
  routeId!: string;
  tripId?: string;
  date: string = this.getTodayDate();
  directionId: number = 0;
  stopTimes: StopTime[] = [];
  trip: Trip | undefined;
  shapes: Shape[] = [];
  stops: Stop[] = [];

  search$ = new BehaviorSubject<string>('');
  filteredTrips: Trip[] = [];

  constructor(private activedRoute: ActivatedRoute, private tripService: TripService, private stopTimeService: StopTimeService, private shapeService: ShapeService) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('routeId')!;
      this.tripId = this.activedRoute.snapshot.queryParamMap.get('tripId') || undefined;
      this.loadTrips();
    });

    combineLatest([
      this.tripService.getTrips(),
      this.search$
    ]).pipe(
      map(([trips, search]) => {
        const lowerSearch = search.toLowerCase();
        return trips.filter(trip =>
          (trip.tripHeadsign ?? '').toLowerCase().includes(lowerSearch)
        );
      })
    ).subscribe(filtered => {
      this.filteredTrips = filtered;
    });
  }

  loadTrips(): void {
    this.tripService.refreshTrips(this.routeId, this.date, this.directionId);
    if (this.tripId) {
      this.tripService.getTripById(this.tripId).then(trip => {
        this.trip = trip;
        this.loadShapes();
      });
    }
  }

  loadStopTimes(): void {
    if (this.tripId) {
      this.stopTimeService.getStopTimes({ tripId: this.tripId, date: this.date }).then(stopTimes => {
        this.stopTimes = stopTimes;
        this.stops = stopTimes.map(stopTime => stopTime.stop).filter(stop => stop !== undefined) as Stop[];
      });
    }
  }

  loadShapes(): void {
    if (this.tripId) {
      this.shapeService.getShapes({ shapeId: this.trip?.shapeId?.id }).then(shapes => {
        this.shapes = shapes;
      });
      this.loadStopTimes();
    }
  }

  onDateInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onDateChange(input.value);
  }

  onDirectionInputChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.onDirectionChange(select.value);
  }

  onDateChange(newDate: string): void {
    this.date = newDate;
    this.loadTrips();
    this.loadStopTimes();
  }

  onDirectionChange(newDirection: string): void {
    this.directionId = parseInt(newDirection);
    this.loadTrips();
  }

  onSearchChange(text: string): void {
    this.search$.next(text);
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
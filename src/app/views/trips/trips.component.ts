import { Component, OnInit, Output } from '@angular/core';
import { Trip } from '../../models/trip';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { SearchbarComponent } from "../../components/searchbar/searchbar.component";
import { TripItemComponent } from "../../components/trip-item/trip-item.component";
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    CommonModule,
    SearchbarComponent,
    TripItemComponent
  ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent implements OnInit {
  routeId!: string;
  date: string = this.getTodayDate();
  directionId: number = 0;

  search$ = new BehaviorSubject<string>('');
  filteredTrips: Trip[] = [];

  constructor(private activedRoute: ActivatedRoute, private tripService: TripService) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('routeId')!;
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
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StopRouteItemComponent } from '../../components/stop-route-item/stop-route-item.component';
import { Route } from '../../models/route';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-stop',
  imports: [
    CommonModule,
    SearchbarComponent,
    StopRouteItemComponent
  ],
  standalone: true,
  templateUrl: './stop.component.html',
  styleUrl: './stop.component.css'
})
export class StopComponent implements OnInit {
  stopId!: string;
  date: string = this.getTodayDate();
  directionId: number = 0;

  search$ = new BehaviorSubject<string>('');
  filteredRoutes: Route[] = [];

  constructor(private activedRoute: ActivatedRoute, private routeService: RouteService) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(params => {
      this.stopId = params.get('stopId')!;
    });
    
    const routes$ = this.routeService.getAllRoutes({ stopId: this.stopId });

    combineLatest([routes$, this.search$])
      .pipe(
        map(([routes, search]) => {
          return routes.filter(route =>
            route.id.id.toLowerCase().includes(search.toLowerCase()) ||
            route.longName?.toLowerCase().includes(search.toLowerCase())
          );
        })
      )
      .subscribe(filteredRoutes => {
        this.filteredRoutes = filteredRoutes;
      });
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
  }

  onDirectionChange(newDirection: string): void {
    this.directionId = parseInt(newDirection);
  }

  onSearchChange(text: string): void {
    this.search$.next(text);
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}

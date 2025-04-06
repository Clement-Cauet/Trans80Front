import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { RouteItemComponent } from "../route-item/route-item.component";
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Route } from '../../models/route';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  imports: [
    CommonModule,
    RouteItemComponent,
    SearchbarComponent
  ],
  templateUrl: './schedule.component.html',
  standalone: true,
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  private searchText$ = new BehaviorSubject<string>('');
  filteredRoutes$!: Observable<Route[]>;

  constructor(private routeService: RouteService) { }

  ngOnInit(): void {
    const routes$ = this.routeService.getAllRoutes();

    this.filteredRoutes$ = combineLatest([routes$, this.searchText$]).pipe(
      map(([routes, searchText]) => {
        return routes.filter(route =>
          route.id.id.toLowerCase().includes(searchText.toLowerCase()) ||
          route.longName?.toLowerCase().includes(searchText.toLowerCase())
        );
      })
    );
  }

  onSearchChange(searchText: string): void {
    this.searchText$.next(searchText);
  }

  loadRoutes(): void {
    this.routeService.refreshRoutes();
  }
}
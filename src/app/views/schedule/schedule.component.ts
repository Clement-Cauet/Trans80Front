import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { RouteItemComponent } from "../../components/route-item/route-item.component";
import { SearchbarComponent } from "../../components/searchbar/searchbar.component";
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Route } from '../../models/route';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NavtabComponent } from "../../components/navtab/navtab.component";
import { StopItemComponent } from '../../components/stop-item/stop-item.component';
import { Stop } from '../../models/stop';
import { StopService } from '../../services/stop.service';
@Component({
  selector: 'app-schedule',
  imports: [
    CommonModule,
    RouteItemComponent,
    SearchbarComponent,
    NavtabComponent,
    StopItemComponent
  ],
  templateUrl: './schedule.component.html',
  standalone: true,
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  private searchText$ = new BehaviorSubject<string>('');
  filteredRoutes$!: Observable<Route[]>;
  filteredStops$!: Observable<Stop[]>;
  view: 'routes' | 'stops' = 'routes';

  constructor(
    private routeService: RouteService,
    private stopService: StopService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.view = params['view'] || 'routes';
    });

    const routes$ = this.routeService.getAllRoutes();
    const stops$ = this.stopService.getAllStops();

    this.filteredRoutes$ = combineLatest([routes$, this.searchText$]).pipe(
      map(([routes, searchText]) => {
        return routes.filter(route =>
          route.id.id.toLowerCase().includes(searchText.toLowerCase()) ||
          route.longName?.toLowerCase().includes(searchText.toLowerCase())
        );
      })
    );

    this.filteredStops$ = combineLatest([stops$, this.searchText$]).pipe(
      map(([stops, searchText]) => {
        return stops.filter(stop =>
          stop.name.toLowerCase().includes(searchText.toLowerCase())
        );
      })
    );
  }

  onSearchChange(searchText: string): void {
    this.searchText$.next(searchText);
  }
}
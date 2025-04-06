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

@Component({
  selector: 'app-schedule',
  imports: [
    CommonModule,
    RouteItemComponent,
    SearchbarComponent,
    NavtabComponent
],
  templateUrl: './schedule.component.html',
  standalone: true,
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  private searchText$ = new BehaviorSubject<string>('');
  filteredRoutes$!: Observable<Route[]>;
  view: 'routes' | 'stops' = 'routes';

  constructor(private routeService: RouteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.view = params['view'] || 'routes';
    });

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
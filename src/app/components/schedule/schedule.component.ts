import { CommonModule, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { RouteItemComponent } from "../route-item/route-item.component";
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { Observable } from 'rxjs';
import { Route } from '../../models/route';

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
export class ScheduleComponent {
  routes$!: Observable<Route[]>;

  constructor(private routeService: RouteService) { }

  ngOnInit(): void {
    this.routes$ = this.routeService.getAllRoutes();
  }

  loadRoutes(): void {
    this.routeService.refreshRoutes();
  }

}

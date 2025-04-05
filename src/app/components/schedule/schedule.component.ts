import { CommonModule, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { RouteItemComponent } from "../route-item/route-item.component";
import { StopItemComponent } from "../stop-item/stop-item.component";
import { SearchbarComponent } from "../searchbar/searchbar.component";

@Component({
  selector: 'app-schedule',
  imports: [
    CommonModule,
    RouteItemComponent,
    StopItemComponent,
    SearchbarComponent
],
  templateUrl: './schedule.component.html',
  standalone: true,
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {

  constructor(private routeService: RouteService) {}

  getAllRoutes() {
    return this.routeService.getAllRoutes();
  }

}

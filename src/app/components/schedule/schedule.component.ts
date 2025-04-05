import { CommonModule, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-schedule',
  imports: [
    CommonModule,
    NgForOf
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

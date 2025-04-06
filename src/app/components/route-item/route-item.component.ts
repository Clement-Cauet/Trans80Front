import { Component, Input } from '@angular/core';
import { Route } from '../../models/route';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-item',
  imports: [
    CommonModule
  ],
  templateUrl: './route-item.component.html',
  styleUrl: './route-item.component.css'
})
export class RouteItemComponent {
  @Input() route!: Route;

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate(['/trips', this.route.id.id]);
  }
}

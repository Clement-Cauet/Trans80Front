import { Component, Input } from '@angular/core';
import { Stop } from '../../models/stop';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stop-item',
  imports: [
    CommonModule
  ],
  templateUrl: './stop-item.component.html',
  styleUrl: './stop-item.component.css',
  standalone: true
})
export class StopItemComponent {
  @Input() stop!: Stop;

  constructor(private router: Router) {}

  onClick() {
    this.router.navigate(['/stop', this.stop.id.id]);
  }
}
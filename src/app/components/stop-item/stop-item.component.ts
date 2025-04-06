import { Component, Input } from '@angular/core';
import { Stop } from '../../models/stop';

@Component({
  selector: 'app-stop-item',
  templateUrl: './stop-item.component.html',
  styleUrl: './stop-item.component.css',
  standalone: true
})
export class StopItemComponent {
  @Input() stop!: Stop;

  onClick() {
    console.log('Stop clicked:', this.stop);
  }
}
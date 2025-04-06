import { Component, Input } from '@angular/core';
import { StopTime } from '../../models/stop_time';
import { TimeFormatPipe } from "../../pipes/format-time.pipe";

@Component({
  selector: 'app-stop-time-item',
  imports: [TimeFormatPipe],
  templateUrl: './stop-time-item.component.html',
  styleUrl: './stop-time-item.component.css'
})
export class StopTimeItemComponent {
  @Input() stopTime!: StopTime;
}

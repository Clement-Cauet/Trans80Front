import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHistory } from '../../models/user_history';
import { Trip } from '../../models/trip';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { FormatDateTimePipe } from '../../pipes/format-date-time.pipe';

@Component({
  selector: 'app-history-item',
  imports: [
    CommonModule,
    FormatDatePipe,
    FormatDateTimePipe,
  ],
  templateUrl: './history-item.component.html',
  styleUrl: './history-item.component.css'
})
export class HistoryItemComponent {
  @Input() history!: {history: UserHistory, trip: Trip | null};
}
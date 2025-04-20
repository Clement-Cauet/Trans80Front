import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHistory } from '../../models/user_history';

@Component({
  selector: 'app-history-item',
  imports: [
    CommonModule,
  ],
  templateUrl: './history-item.component.html',
  styleUrl: './history-item.component.css'
})
export class HistoryItemComponent {
  @Input() history!: UserHistory
}
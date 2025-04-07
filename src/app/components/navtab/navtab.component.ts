import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navtab',
  imports: [
    CommonModule
  ],
  templateUrl: './navtab.component.html',
  styleUrl: './navtab.component.css',
  standalone: true
})
export class NavtabComponent {
  @Input() view!: 'routes' | 'stops';
  @Output() viewChange = new EventEmitter<'routes' | 'stops'>();

  setView(view: 'routes' | 'stops'): void {
    this.view = view;
    this.viewChange.emit(view);
  }

  getButtonClasses(buttonView: 'routes' | 'stops'): string {
    return this.view === buttonView
      ? 'bg-white text-blue-800 border-blue-800'
      : 'bg-blue-800 text-white';
  }
}
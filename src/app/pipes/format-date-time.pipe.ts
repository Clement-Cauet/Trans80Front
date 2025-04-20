import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'formatDateTime',
  standalone: true
})
export class FormatDateTimePipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = new Date(value);
    return format(date, 'dd/MM/yyyy HH:mm');
  }
}
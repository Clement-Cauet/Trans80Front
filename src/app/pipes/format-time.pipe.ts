import { Pipe, PipeTransform } from '@angular/core';
import { addSeconds, format } from 'date-fns';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
  transform(seconds: number): string {
    const time = addSeconds(new Date(0, 0, 0, 0, 0, 0), seconds);
    return format(time, 'HH:mm');
  }
}
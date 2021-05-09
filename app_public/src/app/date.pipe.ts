import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe as DP } from '@angular/common';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: number): string {
    var s = new Date(date * 1000).toLocaleDateString("en-UK");
    return s;
  }

}

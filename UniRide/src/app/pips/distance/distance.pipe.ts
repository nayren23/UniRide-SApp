import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(value: number): string {
    if (value == null) {
      return '';
    }

    if (value < 1000) {
      return value.toFixed(0) + ' m';
    } else {
      return (value / 1000).toFixed(2) + ' km';
    }
  }

}

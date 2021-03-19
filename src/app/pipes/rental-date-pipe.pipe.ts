import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rentalDatePipe'
})
export class RentalDatePipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

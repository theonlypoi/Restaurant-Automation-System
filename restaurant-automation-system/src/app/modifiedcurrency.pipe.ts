import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modifiedcurrency'
})
export class ModifiedcurrencyPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let char = '₹';
    return char + value.substring(1);
  }

}

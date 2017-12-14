import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == 0){
      return 'Incompleto';
    }
    let momento = new Date();
    momento.setTime(value);
    return momento.toLocaleDateString();
  }
}
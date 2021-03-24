import { Pipe, PipeTransform } from '@angular/core';

import { CarDetails } from '../models/carDetails';

@Pipe({
  name: 'carPipe'
})
export class CarPipePipe implements PipeTransform {

  transform(value: CarDetails[], filterText: string): CarDetails[] {
    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:CarDetails)=>c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}

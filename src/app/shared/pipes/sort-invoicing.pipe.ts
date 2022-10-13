import { Pipe, PipeTransform } from '@angular/core';

import { IIncomingOutcoming } from 'src/app/models/interfaces/incoming-outcomming.interface';

@Pipe({
  name: 'sortInvoicing'
})
export class SortInvoicingPipe implements PipeTransform {

  transform(items: IIncomingOutcoming[]): IIncomingOutcoming[] {
    return [...items].sort(( first, _second ) => {
      return (first.type === 'INCOMING') ? -1 : 1;
    });
  }

}

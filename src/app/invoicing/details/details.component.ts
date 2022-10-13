import { Component } from '@angular/core';

import { InvoicingFacadeService } from 'src/app/shared/services/facades/invoicing-facade.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})
export class DetailsComponent {
  itemList$ = this.invoicingFacade.items$;

  constructor(
    private readonly invoicingFacade: InvoicingFacadeService,
  ) { }

  deleteItem(uid: string) {
    console.log({ uid });
  }

}

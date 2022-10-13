import { Component } from '@angular/core';

import { InvoicingFacadeService } from 'src/app/shared/services/facades/invoicing-facade.service';
import { IncomingOutcomingService } from '../../services/incoming-outcoming.service';
import { NotificationsFacadeService } from 'src/app/shared/services/facades/notifications-facade.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})
export class DetailsComponent {
  itemList$ = this.invoicingFacade.items$;

  constructor(
    private readonly invoicingFacade: InvoicingFacadeService,
    private readonly incomingOutcomingService: IncomingOutcomingService,
    private readonly notify: NotificationsFacadeService
  ) { }

  deleteItem(itemId: string) {
    this.incomingOutcomingService.deleteIncomingOutcoming(itemId)
      .then(_data => {
        this.notify.success('Eliminado correctamente');
      })
      .catch(err => this.notify.error(err.message))
  }

}

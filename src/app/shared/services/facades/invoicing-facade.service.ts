import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IIncomingOutcoming } from 'src/app/models/interfaces/incoming-outcomming.interface';
import { AppState } from 'src/app/store/app.store';
import { setItemsAction, unsetItemsAction } from 'src/app/store/invoicing/invoicing.actions';
import { selectInvoicingItems } from 'src/app/store/invoicing/invoicing.selectors';

@Injectable({
  providedIn: 'root'
})
export class InvoicingFacadeService {
  items$: Observable<IIncomingOutcoming[]> = this.store.select(selectInvoicingItems);

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  setInvoicing(items: IIncomingOutcoming[]) {
    this.store.dispatch(setItemsAction({ items }));
  }

  unsetInvoicing() {
    this.store.dispatch(unsetItemsAction());
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IIncomingOutcoming } from 'src/app/models/interfaces/incoming-outcomming.interface';
import { AppState } from 'src/app/store/app.store';
import { setItemsAction } from 'src/app/store/invoicing/invoicing.actions';

@Injectable({
  providedIn: 'root'
})
export class InvoicingFacadeService {

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  setInvoicing(items: IIncomingOutcoming[]) {
    this.store.dispatch(setItemsAction({ items }));
  }
}

import { createSelector } from '@ngrx/store';

import { AppState } from '../app.store';
import { InvoicingState } from './invoicing.reducer';
 
export const selectInvoicing = (state: AppState) => state.invoicing;
 
export const selectInvoicingItems = createSelector(
  selectInvoicing,
  (state: InvoicingState) => state.items
);

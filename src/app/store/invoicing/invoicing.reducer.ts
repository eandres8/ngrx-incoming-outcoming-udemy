import { createReducer, on } from '@ngrx/store';

import { IIncomingOutcoming } from 'src/app/models/interfaces/incoming-outcomming.interface';
import { setItemsAction, unsetItemsAction } from './invoicing.actions';

export interface InvoicingState {
    items: IIncomingOutcoming[]; 
}

export const initialState: InvoicingState = {
   items: [],
}

export const invoicingReducer = createReducer(
    initialState,
    on(setItemsAction, (state, { items }) => ({ ...state, items: [...items] })),
    on(unsetItemsAction, state => ({ ...state, items: [] })),
);

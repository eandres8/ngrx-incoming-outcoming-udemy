import { createReducer, on } from '@ngrx/store';

import { IIncomingOutcoming } from 'src/app/models/interfaces/incoming-outcomming.interface';
import { setItems, unsetItems } from './invoicing.actions';

export interface InvoicingState {
    items: IIncomingOutcoming[]; 
}

export const initialState: InvoicingState = {
   items: [],
}

export const invoicingReducer = createReducer(
    initialState,
    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unsetItems, state => ({ ...state, items: [] })),
);

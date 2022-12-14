import { createAction, props } from '@ngrx/store';

import { IIncomingOutcoming } from 'src/app/models/interfaces/incoming-outcomming.interface';

export const enum InvoicingActions {
    SET_ITEMS= '[INVOICING] SET_ITEMS',
    UNSET_ITEMS= '[INVOICING] UNSET_ITEMS',
}

export const setItemsAction = createAction(
    InvoicingActions.SET_ITEMS,
    props<{ items: IIncomingOutcoming[] }>(),
);
export const unsetItemsAction = createAction(InvoicingActions.UNSET_ITEMS);

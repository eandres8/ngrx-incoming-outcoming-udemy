import { ActionReducerMap } from '@ngrx/store';

import { UIState, uiReducer } from './ui/ui.reducer';
import { AuthState, authReducer } from './auth/auth.reducer';
import { invoicingReducer, InvoicingState } from './invoicing/invoicing.reducer';


export interface AppState {
   ui: UIState, 
   auth: AuthState,
   invoicing: InvoicingState,
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: uiReducer,
   auth: authReducer,
   invoicing: invoicingReducer,
}

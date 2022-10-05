import { ActionReducerMap } from '@ngrx/store';

import { UIState, uiReducer } from './shared/ui.reducer';
import { AuthState, authReducer } from './auth/auth.reducer';


export interface AppState {
   ui: UIState, 
   auth: AuthState,
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: uiReducer,
   auth: authReducer
}

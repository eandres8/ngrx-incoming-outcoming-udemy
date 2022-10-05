import { Action, createReducer, on } from '@ngrx/store';

import { startLoadingAction, stopLoadingAction } from './ui.actions';

export interface UIState {
    isLoading: boolean; 
}

export const initialState: UIState = {
   isLoading: false,
}

export const uiReducer = createReducer(
    initialState,
    on(startLoadingAction, state => ({ ...state, isLoading: true })),
    on(stopLoadingAction, state => ({ ...state, isLoading: false })),
);

// export function uiReducer(state: UIState, action: Action) {
//     return _uiReducer(state, action);
// }
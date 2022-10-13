import { createAction } from '@ngrx/store';

export const enum UIActions {
    START_LOADING= '[UI] START_LOADING',
    STOP_LOADING= '[UI] STOP_LOADING',
}

export const startLoadingAction = createAction(UIActions.START_LOADING);
export const stopLoadingAction = createAction(UIActions.STOP_LOADING);

import { createSelector } from '@ngrx/store';
import { AppState } from '../app.store';
import { UIState } from './ui.reducer';
 
export const selectUI = (state: AppState) => state.ui;
 
export const selectIsLoading = createSelector(
    selectUI,
  (state: UIState) => state.isLoading,
);
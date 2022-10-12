import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.store';
import { startLoadingAction, stopLoadingAction } from '../../ui.actions';
import { selectIsLoading } from '../../ui.selectors';

@Injectable({
  providedIn: 'root'
})
export class UiFacadeService {
  isLoading$ = this.store.select(selectIsLoading);

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  startLoading() {
    this.store.dispatch(startLoadingAction());
  }

  stopLoading() {
    this.store.dispatch(stopLoadingAction());
  }
}

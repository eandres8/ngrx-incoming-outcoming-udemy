import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.store';
import { selectAuthUserId } from 'src/app/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  userId$: Observable<string> = this.store.select(selectAuthUserId)
    .pipe(filter(userId => !!userId));

  constructor(
    private readonly store: Store<AppState>,
  ) { }
}

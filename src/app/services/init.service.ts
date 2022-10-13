import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthFacadeService } from '../shared/services/facades/auth-facade.service';
import { User } from '../models/entities/user.model';
import { IUser } from '../models/interfaces/auth.interface';
import { UserService } from './user.service';
import { InvoicingFacadeService } from '../shared/services/facades/invoicing-facade.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private initUser$: Subscription | undefined;
  private _user: IUser | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly authFacade: AuthFacadeService,
    private readonly userService: UserService,
    private readonly invoicingFacade: InvoicingFacadeService,
  ) { }

  get user() {
    return { ...this._user };
  }

  initAuthListener() {
    return this.authService.authState$.subscribe(fuser => {
      if (!!fuser) {
        this.initUser$ = this.userService.getUser(fuser!.uid)
          .subscribe(firebaseUser => {
            this._user = User.fromMap(firebaseUser as IUser);
            this.authFacade.setUser(this._user);
          });

        return;
      }

      this._user = null;
      this.initUser$?.unsubscribe();
      this.authFacade.cleanUser();
      this.invoicingFacade.unsetInvoicing();
    });
  }
}

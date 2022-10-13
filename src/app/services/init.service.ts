import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthFacadeService } from '../shared/services/facades/auth-facade.service';
import { User } from '../models/entities/user.model';
import { IUser } from '../models/interfaces/auth.interface';
import { UserService } from './user.service';
import { InvoicingFacadeService } from '../shared/services/facades/invoicing-facade.service';
import { LocalUserService } from '../shared/services/local-user.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private initUser$: Subscription | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly authFacade: AuthFacadeService,
    private readonly userService: UserService,
    private readonly invoicingFacade: InvoicingFacadeService,
    private readonly localUser: LocalUserService,
  ) { }

  initAuthListener() {
    return this.authService.authState$.subscribe(fuser => {
      if (!!fuser) {
        this.initUser$ = this.userService.getUser(fuser!.uid)
          .subscribe(firebaseUser => {
            this.localUser.user = User.fromMap(firebaseUser as IUser);
            this.authFacade.setUser(this.localUser.user);
          });

        return;
      }

      this.localUser.cleanUser();
      this.initUser$?.unsubscribe();
      this.authFacade.cleanUser();
      this.invoicingFacade.unsetInvoicing();
    });
  }
}

import { Injectable } from '@angular/core';

import { User } from 'src/app/models/entities/user.model';
import { IUser } from 'src/app/models/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalUserService {
  private _user: User = User.fromMap({});

  get user(): User {
    return this._user;
  }

  set user(user: Partial<IUser>) {
    this._user = User.fromMap(user);
  }

  get userId() {
    return this._user.uid;
  }

  cleanUser() {
    this._user = User.fromMap({});
  }
}

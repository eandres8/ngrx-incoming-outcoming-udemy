import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

import { User } from 'src/app/models/entities/user.model';
import { ILoginUser, IRegisterUser } from 'src/app/models/interfaces/auth.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly userService: UserService,
  ) { }

  get authState$() {
    return this.auth.authState;
  }

  createUser({ email, password, name }: IRegisterUser) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user!.uid, name, email);

        return this.userService.createUser(newUser);
      });
  }

  signIn({ email, password }: ILoginUser) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fuser => !!fuser)
    );
  }
}

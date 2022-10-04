import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

 import { ILoginUser, IRegisterUser } from 'src/app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly auth: AngularFireAuth,
  ) { }

  initAuthListener() {
    return this.auth.authState;
  }

  createUser({ email, password }: IRegisterUser) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn({ email, password }: ILoginUser) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }
}

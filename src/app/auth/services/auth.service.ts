import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

 import { IRegisterUser } from 'src/app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly auth: AngularFireAuth,
  ) { }

  createUser({ email, password }: IRegisterUser) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
}

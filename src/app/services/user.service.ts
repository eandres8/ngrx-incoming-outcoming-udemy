import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { IUser } from '../models/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly path = 'users';

  constructor(
    private readonly firestore: AngularFirestore,
  ) { }

  createUser(user: IUser) {
    return this.firestore.doc(`${user!.uid}/${this.path}`).set({...user});
  }

  getUser(userId: string) {
    return this.firestore.doc<IUser>(`${userId}/${this.path}`).valueChanges();
  }
}

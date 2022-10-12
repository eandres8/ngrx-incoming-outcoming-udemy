import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';


import { AppState } from 'src/app/app.store';
import { User } from 'src/app/models/entities/user.model';
 import { ILoginUser, IRegisterUser, IUser } from 'src/app/models/interfaces/auth.interface';
import { cleanUserAction, setUserAction } from '../auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseUser$: Subscription | undefined;
  private _user: IUser | null = null;

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly firestore: AngularFirestore,
    private readonly store: Store<AppState>,
  ) { }

  get user() {
    return { ...this._user };
  }

  initAuthListener() {
    return this.auth.authState.subscribe(fuser => {
      if (!!fuser) {
        this.firebaseUser$ = this.firestore.doc(`${fuser!.uid}/users`).valueChanges()
          .subscribe(firebaseUser => {
            this._user = User.fromMap(firebaseUser as IUser);
            this.store.dispatch(setUserAction({ user: this._user }));
          });

        return;
      }

      this._user = null;
      this.firebaseUser$?.unsubscribe();
      this.store.dispatch(cleanUserAction());
    });
  }

  createUser({ email, password, name }: IRegisterUser) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new User(user!.uid, name, email);

        return this.firestore.doc(`${user!.uid}/users`).set({...newUser});
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

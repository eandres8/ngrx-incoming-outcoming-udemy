import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { IIncomingOutcoming } from '../models/interfaces/incoming-outcomming.interface';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomingOutcomingService {

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly authService: AuthService,
  ) { }

  createIncomingOutcoming(invoicing: IIncomingOutcoming) {
    const { uid= '' } = this.authService.user;
    return this.firestore.doc(`${uid}/incoming-outcoming`)
      .collection('items')
      .add({ ...invoicing });
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { IIncomingOutcoming } from '../models/interfaces/incoming-outcomming.interface';
import { AuthFacadeService } from '../shared/services/facades/auth-facade.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomingOutcomingService {

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly authService: AuthService,
    private readonly authFacade: AuthFacadeService,
  ) { }

  createIncomingOutcoming(invoicing: IIncomingOutcoming) {
    const { uid= '' } = this.authService.user;
    return this.firestore.doc(`${uid}/incoming-outcoming`)
      .collection('items')
      .add({ ...invoicing });
  }

  initInvoicingListener() {
    this.authFacade.userId$.subscribe(userId => {
      console.log({ userId });
    });
  }
}

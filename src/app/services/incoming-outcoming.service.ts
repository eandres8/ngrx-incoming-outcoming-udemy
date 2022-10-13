import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

import { IncomingOutcoming } from '../models/entities/incoming-outcoming.model';
import { IIncomingOutcoming } from '../models/interfaces/incoming-outcomming.interface';
import { InitService } from './init.service';

@Injectable({
  providedIn: 'root'
})
export class IncomingOutcomingService {
  private readonly path = 'incoming-outcoming';

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly initService: InitService,
  ) { }

  createIncomingOutcoming(invoicing: IIncomingOutcoming) {
    const { uid= '' } = this.initService.user;
    return this.firestore.doc(`${uid}/${this.path}`)
      .collection('items')
      .add({ ...invoicing });
  }

  initInvoicingListener(userId: string) {
    return this.firestore.collection(`${userId}/${this.path}/items`)
      .snapshotChanges().pipe(
        map(snapshot => 
          snapshot.map(doc => IncomingOutcoming.fromMap({
            uid: doc.payload.doc.id,
            ...(doc.payload.doc.data() as any),
          }))
        )
      );
  }
}

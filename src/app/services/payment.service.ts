import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { paymentinfo } from '../models/payment-data';
import { id } from 'date-fns/locale';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(public firestore: AngularFirestore) { }



  addpayment(payment: paymentinfo){
    return this.firestore.collection('payments').add(payment);
  }

  getpayments() {
    return this.firestore.collection('payments').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as paymentinfo;
          const id = a.payload.doc.id;
          //const vmid=a.payload.doc.get("vmid")

          return { id,...data };
        })
        )
      )   
  }
  


  getpaymentList() {  
    return this.firestore.collection('payments').snapshotChanges();
}

saveupdatepaymentList(payInfo: paymentinfo){   
    this.firestore.doc('payments/'+payInfo.id).update(payInfo);    
 }


 deleteEvent(id: string){
  this.firestore.doc('payments/' + id).delete();
}
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { paymentinfo } from '../models/payment-data';

@Injectable({
  providedIn: 'root'
})
export class GeneratePaymentService {

  constructor(public firestore: AngularFirestore) { }


  addgenpayment(genpayment: any){
    return this.firestore.collection('genpayments').add(genpayment);
  }

  getgenpayments() {
    return this.firestore.collection('genpayments').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as paymentinfo;
          const id = a.payload.doc.id;
          const monthyear=a.payload.doc.get("monthyear").toDate();
          //const vmid=a.payload.doc.get("vmid")

          return { id,monthyear,...data };
        })
        )
      )   
  }
  


  getgenpaymentList() {  
    return this.firestore.collection('genpayments').snapshotChanges();
}
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneratePaymentService {

  constructor(public firestore: AngularFirestore) { }


  addgenpayment(genpayment: any){
    return this.firestore.collection('genpayments').add(genpayment);
  }

  // getgenpayments() {
  //   return this.firestore.collection('payments').snapshotChanges().pipe(
  //     map(actions => 
  //       actions.map(a => {
  //         const data = a.payload.doc.data() as paymentinfo;
  //         const id = a.payload.doc.id;
  //         //const vmid=a.payload.doc.get("vmid")

  //         return { id,...data };
  //       })
  //       )
  //     )   
  // }
  


  getgenpaymentList() {  
    return this.firestore.collection('genpayments').snapshotChanges();
}
}

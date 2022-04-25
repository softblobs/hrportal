import { Injectable } from '@angular/core';
import { Vminfo } from '../models/virtual-machine';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirtualmachineService {

  constructor(public firestore: AngularFirestore) { }


  getvms() {
    return this.firestore.collection('vms').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as Vminfo;
          const id = a.payload.doc.id;
          //const vmid=a.payload.doc.get("vmid")

          return { id,...data };
        })
        )
      )   
  }

  createvm(vm: Vminfo){
    return this.firestore.collection('vms').add(vm);
  }


  //-- vm related method --
  // ******   Do not remove if condition -- it loops infinite times ********
  assignvmtoUser(_id: string, _value: string) {    
    
    
    let i=1;
    let doc = this.firestore.collection('vms', ref => ref.where('vmid', '==', _id));
    doc.snapshotChanges().subscribe((res: any) => { 
      console.log(res)     
    if (i===1){
      let id = res[0].payload.doc.id;     
      this.firestore.collection('vms').doc(id).update({vmtype:_value});
      i++;
      return;
    }
    });
   }
}

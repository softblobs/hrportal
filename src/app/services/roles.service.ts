import { Injectable } from '@angular/core';
import { roleInfo } from '../models/roles-data'; 
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
//import { filter, from, map, Observable, of, switchMap, Timestamp } from 'rxjs';
import { fromEvent } from 'rxjs';
import { timestamp } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(public firestore: AngularFirestore) { }

  getSheetList() {
    //alert("serv");
    return this.firestore.collection('roles').snapshotChanges();
}
saveApproveSheetList(timeSheet: roleInfo){  
  this.firestore.doc('timesheet/'+timeSheet.id).update(timeSheet);  
}
saveupdateSheetList(timeSheet: roleInfo){  
  
   if(timeSheet.id==0 || timeSheet.id==null || timeSheet.id=='') 
   {     
      this.firestore.collection('roles').add(timeSheet);
      alert("Inserted Successfully");
   }
   else{
    //alert(timeSheet.id);
     this.firestore.doc('roles/'+timeSheet.id).update(timeSheet);
   alert("Updated Successfully")
   }     
  }
  deleteEvent(id: string){
    this.firestore.doc('roles/' + id).delete();
}

}

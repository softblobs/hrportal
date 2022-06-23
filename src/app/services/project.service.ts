import { Injectable } from '@angular/core';
import { projectInfo } from '../models/project-data'; 
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
//import { filter, from, map, Observable, of, switchMap, Timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(public firestore: AngularFirestore) { }

  getSheetList() {
    //alert("serv");
    return this.firestore.collection('projects').snapshotChanges();
}
deleteEvent(id: string){
  this.firestore.doc('projects/' + id).delete();
}
}

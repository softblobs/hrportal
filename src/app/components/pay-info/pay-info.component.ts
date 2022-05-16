import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { paymentinfo } from 'src/app/models/payment-data';
import { PaymentService } from 'src/app/services/payment.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase/auth';
import { ProfileUser } from 'src/app/models/user-profile';
import firebase from 'firebase/compat';
import { MatTableDataSource } from '@angular/material/table';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';



@Component({
  selector: 'app-pay-info',
  templateUrl: './pay-info.component.html',
  styleUrls: ['./pay-info.component.scss']
})
export class PayInfoComponent implements OnInit {
  employeeList: any;
  hospitalsArray=[];
  displayedColumns: string[] = ['uid', 'assigned', 'name', 'doj', 'view'];
    
    //dataSource:firebase.firestore.DocumentData[]=[];
     dataSourceone:any;
    //dataSource:MatTableDataSource<Element>;
     customerArray = [];    
     datasoc:any;
    //dataSource = this.dataSourceone;
    //user:any;
  

  constructor(public firestore: AngularFirestore,private paymentService:PaymentService,public router:Router ) { }

  ngOnInit(): void {
    this.getAllUser();
    
  }
  onView(uid:any): void{
    console.log(uid);
    
    
    this.paymentService.getpayments().subscribe(res=>{
      var selectedData= res.find( ({ id }) => id === uid )
     // console.log(selectedData?.id);
      //this.userService.editSelectedUser = selectedData;
      localStorage.setItem('userdatatwo', JSON.stringify(selectedData));
      //localStorage.setItem('logUrl',this.userService.editSelectedUser.photoURL)

      




      setTimeout(() => {
        console.log('sleep');
        this.router.navigate(['/payinfo-detail']);
        // And any other code that should run only after 5s
      }, 1000);
      //this._router.navigate(['/user-detail']);
    });
    
  
  }
  
  onAddUser(): void{
    this.router.navigate(['/add-payinfo']);    
  }
  
  getAllUser(){

    this.paymentService.getpayments().subscribe(res=>{
      this.dataSourceone=res;
      this.datasoc =new MatTableDataSource(this.dataSourceone);
      //console.log(this.datasoc.data)
      this.customerArray=this.datasoc.data;
    })
  } 
  
  
  

 
}

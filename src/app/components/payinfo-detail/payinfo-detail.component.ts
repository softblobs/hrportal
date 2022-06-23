import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payinfo-detail',
  templateUrl: './payinfo-detail.component.html',
  styleUrls: ['./payinfo-detail.component.scss']
})
export class PayinfoDetailComponent implements OnInit {
  
  paymentformone= new FormGroup({
    userId:new FormControl(''),
    bankName:new FormControl(''),
    id:new FormControl(''),
    bankAccount:new FormControl(''),
    pfNumber :new FormControl(''),
    uanNumber:new FormControl(''),
    basicAmount:new FormControl(''),
    pfAmount:new FormControl(''),
    profTax:new FormControl(''),
    fixedBonus:new FormControl(''),
    directAllowence:new FormControl(''),
    status:new FormControl(''),

    //userId:new FormControl(''),
       
  });

  uid:any;
  checked = true;  
  hide = true;
  //selectedUserID = this.userService.selectedUser != null ? this.userService.selectedUser.uid : 0;
 // photoURL = this.userService.editSelectedUser.photoURL;
  isEdit = false;
 // isAdmin = this.userService.selectedUser.role == "1" ? true: false;
 // isAdminEdit = this.isAdmin && !this.isEdit ? true : false;
  error="";
  //newdata= JSON.parse(localStorage.getItem('userdatatwo')!);
  
  
  

  

  constructor(private _router: Router,public userservice:UserService, public paymentservice:PaymentService,public afs:AngularFirestore) { }

  roles =[ {id:"Active",value:"Active"},
           {id:"InActive",value:"InActive"}, ];

  
  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('userdatatwo')!).id);
    this.populateForm(JSON.parse(localStorage.getItem('userdatatwo')!));
  }

  populateForm(user:any){
    this.paymentformone.setValue(user);
  }

  
  deleteUser(){}
  onEdit(): void{
    this.isEdit = true;
    //this._router.navigate(['/add-user']);
  }



  updateeditUser():void{
    
    
    this.afs.collection('payments').doc(JSON.parse(localStorage.getItem('userdatatwo')!).id).update({bankName:this.paymentformone.value.bankName,
      
      userId:this.paymentformone.value.userId,
      bankAccount:this.paymentformone.value.bankAccount,
      pfNumber:this.paymentformone.value.pfNumber,
      uanNumber:this.paymentformone.value.uanNumber,
      basicAmount:this.paymentformone.value.basicAmount,
      pfAmount:this.paymentformone.value.pfAmount,
      profTax:this.paymentformone.value.profTax,
      fixedBonus:this.paymentformone.value.fixedBonus,
      directAllowence:this.paymentformone.value.directAllowence,
      status:this.paymentformone.value.status,    
      }      
      )
    

    
     
    this.error="Succesfully submitted";
    setTimeout(() => {
      this.error="";
    }, 5000);  //5s

  }


  
 
  

}

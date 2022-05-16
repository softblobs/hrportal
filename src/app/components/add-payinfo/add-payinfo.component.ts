import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { map, finalize } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileUser } from 'src/app/models/user-profile';
import { RolesService } from 'src/app/services/roles.service';
import {  
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,ReactiveFormsModule ,
  Validators,
  ValidatorFn,
  FormBuilder
} from '@angular/forms';
import { V } from '@angular/cdk/keycodes';
import { AngularFireList } from '@angular/fire/compat/database';
import { roleInfo } from 'src/app/models/roles-data';
import { ProjectService } from 'src/app/services/project.service';
import { projectInfo } from 'src/app/models/project-data';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-payinfo',
  templateUrl: './add-payinfo.component.html',
  styleUrls: ['./add-payinfo.component.scss']
})
export class AddPayinfoComponent implements OnInit {

  error="";
  dataSourceThree:any;
  datasocThree: any;
  customerArray:any[] = [];

  paymentForm = new FormGroup({
   // firstName:new FormControl('',Validators.required),
    userId:new FormControl('',Validators.required),  
    bankName:new FormControl('',Validators.required),
    bankAccount:new FormControl('',Validators.required),
    pfNumber:new FormControl('',Validators.required),
    uanNumber:new FormControl('',Validators.required),
    basicAmount:new FormControl('',Validators.required),
    pfAmount:new FormControl('',Validators.required),
    profTax:new FormControl('',Validators.required),
    directAllowence:new FormControl('',Validators.required),
    fixedBonus:new FormControl('',Validators.required),
    status:new FormControl('',Validators.required),
    
  }
    
   );

  constructor(public paymentservice:PaymentService,public userservice:UserService) { }

  
      roles =[ {id:"Active",value:"Active"},
                   {id:"InActive",value:"InActive"},
                   

                 ];

  ngOnInit(): void {

    this.getvms()
  }

  get userId(){
    return this.paymentForm.get('userId');
   }

  get bankName(){
    return this.paymentForm.get('bankName');
   }

   get bankAccount(){
    return this.paymentForm.get('bankAccount');
   }
   get pfNumber(){
    return this.paymentForm.get('pfNumber');
   }
   get uanNumber(){
    return this.paymentForm.get('uanNumber');
   }
   get basicAmount(){
    return this.paymentForm.get('basicAmount');
   }
   get pfAmount(){
    return this.paymentForm.get('pfAmount');
   }
   get profTax(){
    return this.paymentForm.get('profTax');
   }
   get directAllowence(){
    return this.paymentForm.get('directAllowence');
   }
   get fixedBonus(){
    return this.paymentForm.get('fixedBonus');
   }
   submit(){
     this.paymentservice.addpayment(this.paymentForm.value);
     this.error="succesfully Submitted"
    setTimeout(() => {this.error="";}, 3000);

   }

   getvms(){
    this.userservice.getAllUsers().subscribe(res=>{
    this.dataSourceThree=res;
    this.datasocThree =new MatTableDataSource(this.dataSourceThree);
    console.log(this.datasocThree.data);
    this.customerArray=this.datasocThree.data;
  })
   }



}

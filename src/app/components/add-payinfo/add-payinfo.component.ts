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
import { GeneratePaymentService } from 'src/app/services/generate-payment.service';
import { User } from 'firebase/auth';
import { paymentinfo } from 'src/app/models/payment-data';



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


  customerArraytwo:any[] = [];
  newarrr:any[] = [];

  newlist:any[] = [];
  newlisttwo:any[] = [];


  dataSourcefour:any;
  datasocfour: any;
  flag:boolean=false;
  selectedData:any;



  userdataA:any;
  userdataB:any;

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
   changeStatus(event:any){ 
    this.paymentForm.patchValue({
      pfAmount:event.target.value/10,
      profTax:event.target.value/20,
    directAllowence:event.target.value/30,
    fixedBonus:event.target.value/25
    
     });
   }

  constructor(public paymentservice:PaymentService,public userservice:UserService,public genpaymentservice:GeneratePaymentService, public afs:AngularFirestore) { }

  
      roles =[ {id:"Active",value:"Active"},
                   {id:"InActive",value:"InActive"},
                   

                 ];


  ngOnInit(): void {

   // this.getvms()
   // this.getpaymentvms();
    this.newmethod();
   // this.newmethod2();
   // this.newmethod3();
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
        
      this.updateeditUser();

   }


   newmethod(){
    
      this.userservice.getusersList().subscribe(data => {             
        var selectedData= data.filter( (record) => { 
        
          return record.payload.doc.get("paystatus")== "1"
          
       });         
         
        console.log(selectedData);  
        this.userdataA = selectedData.map(e => {                    
          return {        
            id: e.payload.doc.id,                                                   
            userId:e.payload.doc.get("userId"),
            firstName:e.payload.doc.get("firstName"),
            paystatus:e.payload.doc.get("paystatus"),        
          } as ProfileUser;            
       })       

        this.customerArray=this.userdataA;
        console.log(this.customerArray);
       }
      )}
     

      updateeditUser():void{ 
        let i=1;
        
        this.userservice.getAllUsers().subscribe(res=>{
          var selectedData= res.find( ({ userId }) => userId === this.paymentForm.value.userId )
          console.log(selectedData?.id);
         
    
          //let doc = this.afs.collection('users', ref => ref.where('uid', '==', selectedData?.id));
          
          //doc.snapshotChanges().subscribe((res: any) => { 
            if (i===1){
             // let id = res[0].payload.doc.id;
         this.afs.collection('users').doc(selectedData?.id).update({paystatus: '2'}); 
          
        }
        i++
      
      });
      localStorage.setItem('UpdateSt','Yes'); 
      }    
      
    
       
}

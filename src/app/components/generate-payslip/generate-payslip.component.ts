import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { timesheetInfo } from 'src/app/models/timesheet-data';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { id } from 'date-fns/locale';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentService } from 'src/app/services/payment.service';
import { paymentinfo } from 'src/app/models/payment-data';
import { GeneratePaymentService } from 'src/app/services/generate-payment.service';
import { FormControl } from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-generate-payslip',
  templateUrl: './generate-payslip.component.html',
  styleUrls: ['./generate-payslip.component.scss']
})
export class GeneratePayslipComponent implements OnInit {
 
  refresh = new Subject<void>();
  maxDate = new Date();
  curDate = new Date();
  selectedCheck: any=[];
  approveSheetList:any;
  approveSheetListnewtwo:any;
  newlist:any=[];
  flag:boolean =false;

  approveDropSheetList:any;
  form: any;
  UserList: any;
  error="";

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }

 minDate = new Date();
  constructor(public paymentserve:PaymentService,public genpaymentserve:GeneratePaymentService,public userService:UserService) {

    const currentYear = new Date().getFullYear();
    const currentMonth= new Date().getMonth();
    const currentDate =new Date().getDay();
    this.minDate = new Date(currentYear - 0, currentMonth-1, currentDate);
   }
   issuperAdmin= localStorage.getItem("logRole") == "2" ? true: false;



  @ViewChild('picker') datePickerElement = MatDatepicker;
  ngOnInit(): void {
    
    //this.addgenpayment()
    this.genfetchData();
    //this.monthandyeardata();
  }


   selectedDate = new Date();
  // onChangeEvent(event:any){ 
  //   this.selectedDate = event.target.value;
  //   this.fetchData();  
  //  }
  //  convert(str:any) {
  //   var date = new Date(str),
  //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  //     day = ("0" + date.getDate()).slice(-2);
  //   return [date.getFullYear(), mnth, day].join("-");
  // } 
  convert(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth].join("");
  }     

  converttwo(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), Number(mnth)-1].join("");
  } 
  

   fetchData() {
     
      this.paymentserve.getpaymentList().subscribe(data => {             
        var selectedData= data.filter( (record) => { 
        
          return record.payload.doc.get("status")== "Active"
          
       });  
        console.log(selectedData);  
        this.approveSheetList = selectedData.map(e => {                    
          return {        
            id: e.payload.doc.id,                                                   
            bankName:e.payload.doc.get("bankName"),
            bankAccount:e.payload.doc.get("bankAccount"),
            userId:e.payload.doc.get("userId"),
            basicAmount:e.payload.doc.get("basicAmount"),
            directAllowence:e.payload.doc.get("directAllowence"),
            pfAmount:e.payload.doc.get("pfAmount"),
            pfNumber:e.payload.doc.get("pfNumber"),
            profTax:e.payload.doc.get("profTax"),
            fixedBonus:e.payload.doc.get("fixedBonus"),
            uanNumber:e.payload.doc.get("uanNumber"),
            status:e.payload.doc.get("status"),
            leaves:"newone" ,
            monthyear:this.selectedDate           
          } as paymentinfo;            
       })   
       //console.log(this.approveSheetList);
      // this.genpaymentserve.addgenpayment(this.approveSheetList[0]);
      }); 
    
    
    }
    
    
    genfetchData() {  
      this.genpaymentserve.getgenpaymentList().subscribe(data => {             
        var selectedData= data//.filter( (record) => { 
          //console.log(this.convert(record.payload.doc.get("monthyear")));
         // return record.payload.doc.get("userId") != "sb-101"
      //  return this.convert(record.payload.doc.get("monthyear")) ==this.convert(this.selectedDate) && this.converttwo(record.payload.doc.get("monthyear")) ==this.convert(this.selectedDate)
      // });  
        console.log(selectedData);  
        this.approveSheetListnewtwo = selectedData.map(e => {                    
          return {        
            id: e.payload.doc.id,                                                   
            bankName:e.payload.doc.get("bankName"),
            bankAccount:e.payload.doc.get("bankAccount"),
            userId:e.payload.doc.get("userId"),
            basicAmount:e.payload.doc.get("basicAmount"),
            directAllowence:e.payload.doc.get("directAllowence"),
            pfAmount:e.payload.doc.get("pfAmount"),
            pfNumber:e.payload.doc.get("pfNumber"),
            profTax:e.payload.doc.get("profTax"),
            fixedBonus:e.payload.doc.get("fixedBonus"),
            uanNumber:e.payload.doc.get("uanNumber"),
            status:e.payload.doc.get("status"),
            monthyear:e.payload.doc.get("monthyear").toDate(),
            leaves:"newone" ,
            //monthyear:this.selectedDate           
          } as paymentinfo;            
       })   
       console.log(this.approveSheetListnewtwo);
       for(let i =0;i < this.approveSheetListnewtwo.length; i++){
        this.newlist.push(this.convert(this.approveSheetListnewtwo[i].monthyear));
        console.log(this.newlist);
      }
      // this.genpaymentserve.addgenpayment(this.approveSheetList[0]);
      }); 
    }

    // monthandyeardata(){
    //   for(let i =0;i < this.approveSheetListnewtwo.length; i++){
    //     this.newlist.push(this.approveSheetListnewtwo[i].monthyear);
    //     console.log(this.newlist);
    //   }
    // }





    addgenpayment(){
      

      //console.log(this.approveSheetList);
     // this.genpaymentserve.addgenpayment(this.approveSheetList);
    }

   
 
   checkAll() {
    for (let i = 0; i < this.selectedCheck.length; i++) {
      this.selectedCheck.pop[i];
    }
    for (let i = 0; i < this.approveSheetList.length; i++) {
      this.approveSheetList[i].selected = true;
      this.selectedCheck.push(this.approveSheetList[i].id);
    }    

  }
  uncheckAll() {
    for (let i = 0; i < this.approveSheetList.length; i++) {
      this.approveSheetList[i].selected = false;      
    }    
    for (let i = 0; i < this.selectedCheck.length; i++) {
      this.selectedCheck.pop[i];
    }
  }



  approve() { 
    for(let i =0;i < this.newlist.length; i++){
      if(this.newlist[i]==this.convert(this.selectedDate) || this.newlist[i]==this.converttwo(this.selectedDate)){
        //this.error="Already generated for this month"

        //window.alert("Already generated for this month");
        this.flag=true
        break;
      } }

      if(this.flag==true){
        this.error="Already generated for this month";
        setTimeout(() => {this.error="";}, 3000);
      }
       else{
      
         console.log(this.approveSheetList);

         for(let i =0;i < this.approveSheetList.length; i++){
          this.genpaymentserve.addgenpayment(this.approveSheetList[i]);
          this.error="Successfully generated pay slips";
          setTimeout(() => {this.error="";}, 3000);

         }
    
        }
        this.flag=true
      }
     
    // for (let i = 0; i < this.selectedCheck.length; i++) {
    //   console.log(this.selectedCheck[i]);
    //   for (let j = 0; j < this.approveSheetList.length; j++) {
    //     if(this.approveSheetList[j].id == this.selectedCheck[i]){
    //       this.approveSheetList[j].status = "Approved";
    //       this.paymentserve.saveApproveSheetList(this.approveSheetList[j]);     
    //     }
    //   }
    // }  
    // this.error="Approved Successfully";
    // setTimeout(() => {this.error="";}, 3000);
  



  submit(){
    console.log(this.form.value);
  } 


onCheckboxChange(event:any)
  {
  let index= this.selectedCheck.indexOf(event.target.value);
  if(index==-1)
  {
  
    this.selectedCheck.push(event.target.value);  
  }
  else{ 
    this.selectedCheck.splice(index,1) 
  }
    //console.log(this.selectedCheck);
}

changeUser(e: any) {    
  var splitted = e.target.value.split("\:"); 
  this.UserList = splitted[1].trim();
  this.fetchData();
}



// selectedDate = new Date();
  onChangeEvent(event:any){ 
    this.selectedDate = event.target.value;
    //this.fetchData(); 
    console.log(this.selectedDate); 
    this.fetchData(); 
   }

}



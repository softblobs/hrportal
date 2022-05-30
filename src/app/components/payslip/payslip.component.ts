import { Component, OnInit } from '@angular/core';
import { paymentinfo } from 'src/app/models/payment-data';
import { PaymentService } from 'src/app/services/payment.service';
import {  ViewChild, ElementRef } from '@angular/core';

import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';  
import {Moment} from 'moment';

const moment =  _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { GeneratePaymentService } from 'src/app/services/generate-payment.service';



@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class PayslipComponent implements OnInit {
  
  date = new FormControl(moment());

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    var ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.monthandyearinput =this.convert(ctrlValue)
    console.log(this.convert(ctrlValue));
    datepicker.close();
    this.onView2();
   // this.disableDIV=true;
  }
  

    userid:any

  constructor(public paymentserve:PaymentService,public genpaymentserve:GeneratePaymentService) { }

  arraydata:any;
  arraydata2:any;
  totaldec:any
  totalearnings:any;
  netpay:any;
  today: any;
  monthandyear:any
  monthandyearinput:any;

  approveSheetListtwo:any;


  Pfnumber:any;
  UanNumber:any;
  Bankname:any;
  Bankaccount:any;
  Basicamount:any;
  Pfamount:any;
  Fixedbonus:any;
  Proftax:any;
  Directallowence:any;
  disableDIV: boolean = false;

  error="";
  

  
  ngOnInit(): void {
    this.arraydata=JSON.parse(localStorage.getItem('userdata')!);//localStorage.getItem("userdata");
    console.log(this.arraydata.firstName); 
    //this.arraydata2=JSON.parse(localStorage.getItem('userdatatwo')!);
  }
  

  onView2(): void{          
            this.genpaymentserve.getgenpaymentList().subscribe(data=>{
              var selectedData= data.filter( (record) => {

                console.log(this.convert(record.payload.doc.get("monthyear").toDate()));
                console.log(this.monthandyearinput);

                return  record.payload.doc.get("userId")== localStorage.getItem('loguserid') && this.convert(record.payload.doc.get("monthyear").toDate())==this.monthandyearinput;                
             }); 

              console.log(selectedData);  
              this.approveSheetListtwo = selectedData.map(e => {                    
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
                } as paymentinfo;            
             }) 
             
             
             localStorage.setItem('userdatatwo', JSON.stringify(this.approveSheetListtwo[0])); 
            
             //this.arraydata2=JSON.parse(localStorage.getItem('userdatatwo')!);
             //console.log(this.arraydata2);
             if (this.approveSheetListtwo.length !=0){

             this.Pfnumber=JSON.parse(localStorage.getItem('userdatatwo')!).pfNumber != null ? JSON.parse(localStorage.getItem('userdatatwo')!).pfNumber :0;
             this.UanNumber=JSON.parse(localStorage.getItem('userdatatwo')!).uanNumber != null ? JSON.parse(localStorage.getItem('userdatatwo')!).uanNumber :0;
             this.Bankname=JSON.parse(localStorage.getItem('userdatatwo')!).bankName != null ? JSON.parse(localStorage.getItem('userdatatwo')!).bankName :0;
             this.Bankaccount=JSON.parse(localStorage.getItem('userdatatwo')!).bankAccount != null ? JSON.parse(localStorage.getItem('userdatatwo')!).bankAccount :0;
             this.Pfamount=JSON.parse(localStorage.getItem('userdatatwo')!).pfAmount != null ? JSON.parse(localStorage.getItem('userdatatwo')!).pfAmount :0;
             this.Fixedbonus=JSON.parse(localStorage.getItem('userdatatwo')!).fixedBonus != null ? JSON.parse(localStorage.getItem('userdatatwo')!).fixedBonus :0;
             this.Proftax=JSON.parse(localStorage.getItem('userdatatwo')!).profTax != null ? JSON.parse(localStorage.getItem('userdatatwo')!).profTax :0;
             this.Directallowence=JSON.parse(localStorage.getItem('userdatatwo')!).directAllowence != null ? JSON.parse(localStorage.getItem('userdatatwo')!).directAllowence :0;
             this.Basicamount=JSON.parse(localStorage.getItem('userdatatwo')!).basicAmount != null ? JSON.parse(localStorage.getItem('userdatatwo')!).basicAmount :0;
             
             this.monthandyear=this.convert(JSON.parse(localStorage.getItem('userdatatwo')!).monthyear);
             
             
             this.totaldec=Number(JSON.parse(localStorage.getItem('userdatatwo')!).pfAmount) + Number(JSON.parse(localStorage.getItem('userdatatwo')!).profTax);
 
             this.totalearnings=Number(JSON.parse(localStorage.getItem('userdatatwo')!).basicAmount)+Number(JSON.parse(localStorage.getItem('userdatatwo')!).directAllowence) + Number(JSON.parse(localStorage.getItem('userdatatwo')!).fixedBonus);
    
             this.netpay=this.totalearnings-this.totaldec; 
             this.disableDIV=true;
             }
             else{

              this.disableDIV=false;
              this.error="Payslip not generated for this month"
              setTimeout(() => {this.error="";}, 5000);

           //   this.Pfnumber= 0 ;//JSON.parse(localStorage.getItem('userdatatwo')!).pfNumber != null ? JSON.parse(localStorage.getItem('userdatatwo')!).pfNumber :0;
            // this.UanNumber= 0 ;//JSON.parse(localStorage.getItem('userdatatwo')!).uanNumber != null ? JSON.parse(localStorage.getItem('userdatatwo')!).uanNumber :0;
           //  this.Bankname= 0 ;//JSON.parse(localStorage.getItem('userdatatwo')!).bankName != null ? JSON.parse(localStorage.getItem('userdatatwo')!).bankName :0;
           //  this.Bankaccount= 0 ;//JSON.parse(localStorage.getItem('userdatatwo')!).bankAccount != null ? JSON.parse(localStorage.getItem('userdatatwo')!).bankAccount :0;
           //  this.Pfamount= 0 ;//JSON.parse(localStorage.getItem('userdatatwo')!).pfAmount != null ? JSON.parse(localStorage.getItem('userdatatwo')!).pfAmount :0;
           //  this.Fixedbonus= 0 ;//JSON.parse(localStorage.getItem('userdatatwo')!).fixedBonus != null ? JSON.parse(localStorage.getItem('userdatatwo')!).fixedBonus :0;
           //  this.Proftax= 0 ;//JSON.parse(localStorage.getItem('userdatatwo')!).profTax != null ? JSON.parse(localStorage.getItem('userdatatwo')!).profTax :0;
           //  this.Directallowence= 0 ;//JSON.parse(localStorage.getItem('userdatatwo')!).directAllowence != null ? JSON.parse(localStorage.getItem('userdatatwo')!).directAllowence :0;
           //  this.Basicamount= 0 ;//JSON.parse(localStorage.getItem('userdatatwo')!).basicAmount != null ? JSON.parse(localStorage.getItem('userdatatwo')!).basicAmount :0;
             
           //  this.monthandyear= 0 ;//this.convert(JSON.parse(localStorage.getItem('userdatatwo')!).monthyear);
             
             
           //  this.totaldec= 0 ;//Number(JSON.parse(localStorage.getItem('userdatatwo')!).pfAmount) + Number(JSON.parse(localStorage.getItem('userdatatwo')!).profTax);
 
           //  this.totalearnings= 0 ;//Number(JSON.parse(localStorage.getItem('userdatatwo')!).basicAmount)+Number(JSON.parse(localStorage.getItem('userdatatwo')!).directAllowence) + Number(JSON.parse(localStorage.getItem('userdatatwo')!).fixedBonus);
    
           //  this.netpay= 0 ;//this.totalearnings-this.totaldec;
             }
             
            });                
      }


        

       downloadpdf(): void{
            console.log("true")
            var data = document.getElementById('contentToConvert');
             //  console.log(data);
            if(data!=null){
            html2canvas(data).then(canvas => {
              var imgWidth = 190;  //208
              var imgHeight = canvas.height * imgWidth / canvas.width;
              const contentDataURL = canvas.toDataURL('image/png')
              let pdf = new jspdf('p', 'mm', 'a4');
              var position = 20;
              pdf.addImage(contentDataURL, 'PNG', 3, position, imgWidth, imgHeight)
              //pdf.save('newPDF.pdf');
              pdf.save("payslip"+"-"+ this.arraydata.firstName+"-"+this.arraydata.lastName +"-"+this.monthandyear );
            });
          }          
       }



     convert(str:any) {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth].join("-");
      }     
  }
    

      




     
    
    
  
  
  
  //var selectedData= res.find( ({ userId }) => userId === localStorage.getItem('loguserid'));                              
 // console.log(selectedData?.id);           
 // this.monthandyear=(this.convert(selectedData?.monthyear.toDate()));
 // localStorage.setItem('userdatatwo', JSON.stringify(selectedData));

  


  
    



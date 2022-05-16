import { Component, OnInit } from '@angular/core';
import { paymentinfo } from 'src/app/models/payment-data';
import { PaymentService } from 'src/app/services/payment.service';
import {  ViewChild, ElementRef } from '@angular/core';
  

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {
  
  //approveDropSheetList: any;

  userid:any

  constructor(public paymentserve:PaymentService) { }

  arraydata:any;
  arraydata2:any;
  totaldec:any
  totalearnings:any;
  netpay:any;
  today: any;

  
  ngOnInit(): void {

   this.arraydata=JSON.parse(localStorage.getItem('userdata')!);//localStorage.getItem("userdata");
   console.log(this.arraydata.firstName);
   
   //this.userid=this.arraydata.userId;//(JSON.parse(localStorage.getItem('userdatatwo')!)).userId;
   //console.log(this.userid)
   this.onView2()
  this.arraydata2=JSON.parse(localStorage.getItem('userdatatwo')!);

  this.totaldec=Number(JSON.parse(localStorage.getItem('userdatatwo')!).pfAmount) + Number(JSON.parse(localStorage.getItem('userdatatwo')!).profTax);

  this.totalearnings=Number(JSON.parse(localStorage.getItem('userdatatwo')!).basicAmount)+Number(JSON.parse(localStorage.getItem('userdatatwo')!).directAllowence) + Number(JSON.parse(localStorage.getItem('userdatatwo')!).fixedBonus);
   
  this.netpay=this.totalearnings-this.totaldec;
  //this.arraydata2=JSON.parse(localStorage.getItem('userdatatwo')!);
   //console.log(this.arraydata2);
   this.today = new Date().toISOString().split('T')[0];
    console.log(this.today)
  }
  

    //  onView(){

    
    //   this.paymentserve.getpaymentList().subscribe(data => {             
    //     var selectedData= data;//.filter( (record) => {  
        
    
    //       this.approveDropSheetList = selectedData.map(e => {
                         
    //         return {        
    //           id: e.payload.doc.id,

                
                
    //         } as paymentinfo;     
    //      } ) })}

        

         onView2(): void{
          //console.log(id);
          //userid=(JSON.parse(localStorage.getItem('userdatatwo')!.userId)
          
          this.paymentserve.getpayments().subscribe(res=>{
            var selectedData= res.find( ({ userId }) => userId === localStorage.getItem('loguserid') )
            console.log(selectedData?.id);
            //this.userService.editSelectedUser = selectedData;
            //this.arraydata2=selectedData
            localStorage.setItem('userdatatwo', JSON.stringify(selectedData));
            //this.arraydata2=JSON.parse(localStorage.getItem('userdatatwo')!);
            //localStorage.setItem('logUrl',this.userService.editSelectedUser.photoURL)
      
            
      
      
      
      
           // setTimeout(() => {
            //  console.log('sleep');
            //  this._router.navigate(['/user-detail']);
              // And any other code that should run only after 5s
           // }, 1000);
            //this._router.navigate(['/user-detail']);
          });
          
        
        }

        downloadpdf(): void{
            console.log("true")
            var data = document.getElementById('contentToConvert');
             //  console.log(data);
            if(data!=null){
            html2canvas(data).then(canvas => {
              var imgWidth = 208;
              var imgHeight = canvas.height * imgWidth / canvas.width;
              const contentDataURL = canvas.toDataURL('image/png')
              let pdf = new jspdf('p', 'mm', 'a4');
              var position = 0;
              pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
              pdf.save('newPDF.pdf');
            });
          }
          
     }


        


  }
    

      




     
    
    
  
  
  


  


  
    



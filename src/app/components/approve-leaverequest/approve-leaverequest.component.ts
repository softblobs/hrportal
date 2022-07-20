import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { leaveinfo } from 'src/app/models/leave-data';
import { LeaveService } from 'src/app/services/leave.service';
import { id } from 'date-fns/locale';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-approve-leaverequest',
  templateUrl: './approve-leaverequest.component.html',
  styleUrls: ['./approve-leaverequest.component.scss']
})
export class ApproveLeaverequestComponent implements OnInit {
  refresh = new Subject<void>();
 // maxDate = new Date();
  curDate = new Date();
  approveSheetList:any;
  selectedCheck: any=[];
  UserList: any;
  approveDropSheetList:any;
  form: any;
  currenstatus:any = "Approved";
  error="";
  // selectButtonsEnabled:boolean=true;

  constructor(private leaveService:LeaveService) { }

  ngOnInit(): void {
      this.fetchDataDropDown();
  }
  selectedDate = new Date();
  onChangeEvent(event:any){ 
    this.selectedDate = event.target.value;
    this.fetchData();  
   }

   changeStatus(event:any){
     this.currenstatus = event.target.value;
     this.fetchData();  
   }
   convert(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }   
  
  fetchData() {
    
    this.leaveService.getLeaveList().subscribe(data => { 
      
      var selectedData= data.filter( (record) => {         
        //return record.payload.doc.get("datefrom") == this.convert(this.selectedDate)  && record.payload.doc.get("userId") == this.UserList; 
        return record.payload.doc.get("status") == this.currenstatus  && record.payload.doc.get("userId") == this.UserList; 

      })
      this.approveSheetList = selectedData.map(e => {        
        let d2 = new Date(e.payload.doc.get("datefrom")).toDateString().split("00")[0];
        let d3 = new Date(e.payload.doc.get("dateto")).toDateString().split("00")[0];
        if(d3 == 'Invalid Date'){ 
          const timeStampDateD2 = e.payload.doc.get("datefrom");
          const dateInMillisD2  = timeStampDateD2.seconds * 1000;          
          var date2 = new Date(dateInMillisD2).toDateString();
          d2 = date2;
          const timeStampDate3 = e.payload.doc.get("dateto");
          const dateInMillis3 = timeStampDate3.seconds * 1000;          
          var date3 = new Date(dateInMillis3).toDateString();
          d3 = date3;
        }
        return {
          id: e.payload.doc.id,
          leavetype: e.payload.doc.get("leavetype"),
          leavereason: e.payload.doc.get("leavereason"),
          datefrom: d2,
          dateto: d3,
          userId: e.payload.doc.get("userId"),
          status: e.payload.doc.get("status"),
        } as unknown as leaveinfo;     
      })          
    });  


  } 

  fetchDataDropDown() {
    if (localStorage.getItem("logRole")=="2"){
      this.leaveService.getLeaveList().subscribe(data => { 
      
        var selectedData= data.filter( (record) => {  
          return   localStorage.getItem('currentUser') != record.payload.doc.get("userId")  //this.convert(record.payload.doc.get("modified").toDate()) == this.convert(this.selectedDate) && localStorage.getItem('logProject') == record.payload.doc.get("project") && 
          && localStorage.getItem('logName') != record.payload.doc.get("userName");  
         });  
          
        this.approveDropSheetList = selectedData.map(e => {  
          let d2 = new Date(e.payload.doc.get("datefrom")).toDateString().split("00")[0];
          let d3 = new Date(e.payload.doc.get("dateto")).toDateString().split("00")[0];   
          if(d3 == 'Invalid Date'){ 
            const timeStampDateD2 = e.payload.doc.get("datefrom");
            const dateInMillisD2  = timeStampDateD2.seconds * 1000;          
            var date2 = new Date(dateInMillisD2).toDateString();
            d2 = date2;
            const timeStampDate3 = e.payload.doc.get("dateto");
            const dateInMillis3 = timeStampDate3.seconds * 1000;          
            var date3 = new Date(dateInMillis3).toDateString();
            d3 = date3;
          }   
          return {
            id: e.payload.doc.id,
            leavetype: e.payload.doc.get("leavetype"),
            leavereason: e.payload.doc.get("leavereason"),
            datefrom: d2,
            dateto: d3,
            userId: e.payload.doc.get("userId"),
            status: e.payload.doc.get("status"),
            userName: e.payload.doc.get("userName"),
          } as unknown as leaveinfo;     
        })       
       var key = "userName";
       this.approveDropSheetList = [...new Map(this.approveDropSheetList.map((d: { [x: string]: any; }) => [d[key], d])).values()]
  
      });  

    }

    else{
    
    this.leaveService.getLeaveList().subscribe(data => { 
      
      var selectedData= data.filter( (record) => {                 
        return localStorage.getItem('logProject') == record.payload.doc.get("project") 
         && localStorage.getItem('currentUser') != record.payload.doc.get("userId")  //this.convert(record.payload.doc.get("modified").toDate()) == this.convert(this.selectedDate) && localStorage.getItem('logProject') == record.payload.doc.get("project") && 
          && localStorage.getItem('logName') != record.payload.doc.get("userName");  
         });   
        
      this.approveDropSheetList = selectedData.map(e => {   
        let d2 = new Date(e.payload.doc.get("datefrom")).toDateString().split("00")[0];
        let d3 = new Date(e.payload.doc.get("dateto")).toDateString().split("00")[0];
        if(d3 == 'Invalid Date'){ 
          const timeStampDateD2 = e.payload.doc.get("datefrom");
          const dateInMillisD2  = timeStampDateD2.seconds * 1000;          
          var date2 = new Date(dateInMillisD2).toDateString();
          d2 = date2;
          const timeStampDate3 = e.payload.doc.get("dateto");
          const dateInMillis3 = timeStampDate3.seconds * 1000;          
          var date3 = new Date(dateInMillis3).toDateString();
          d3 = date3;
        }
        return {
          id: e.payload.doc.id,
          leavetype: e.payload.doc.get("leavetype"),
          leavereason: e.payload.doc.get("leavereason"),
          datefrom: d2,
          dateto: d3,
          userId: e.payload.doc.get("userId"),
          status: e.payload.doc.get("status"),
          userName: e.payload.doc.get("userName"),
        } as unknown as leaveinfo;     
      })       
     var key = "userName";
     this.approveDropSheetList = [...new Map(this.approveDropSheetList.map((d: { [x: string]: any; }) => [d[key], d])).values()]

    });  
  }

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
   
   console.log(this.selectedCheck);
}
approve(timesht: leaveinfo) { 
  if(this.selectedCheck.length!=0){ 
  for (let i = 0; i < this.selectedCheck.length; i++) {
    for (let j = 0; j < this.approveSheetList.length; j++) {
      if(this.approveSheetList[j].id == this.selectedCheck[i]){
        this.approveSheetList[j].status = "Approved";
        // this.selectButtonsEnabled=false;
        this.leaveService.saveupdateSheetList(this.approveSheetList[j]);     
      }
    }
  }  
  // this.selectButtonsEnabled=false;
    this.error="Approved Successfully";
    setTimeout(() => {this.error="";}, 3000);
    
}
else{
  this.error="Please select check box to approve";
    setTimeout(() => {this.error="";}, 3000);
}
}

changeUser(e: any) {    
  // this.selectButtonsEnabled=true;
  var splitted = e.target.value.split("\:"); 
  this.UserList = splitted[1].trim();  
  this.fetchData();  
  // for (let i = 0; i < this.approveDropSheetList.length; i++) 
  // {
  //   if(this.approveDropSheetList[i].status!=="Approved")

  //   {this.selectButtonsEnabled=false;}
    
  // }
}

}

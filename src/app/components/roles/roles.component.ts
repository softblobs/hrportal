import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {ChangeDetectionStrategy,ViewChild,TemplateRef,} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay, isSameMonth, addHours, getDate,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import startOfISOWeekYear from 'date-fns/startOfISOWeekYear';
import { RolesService } from 'src/app/services/roles.service';
import { roleInfo } from 'src/app/models/roles-data';
import { projectInfo } from 'src/app/models/project-data';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { id } from 'date-fns/locale';
import { DatePipe } from '@angular/common';
//import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from 'src/app/services/project.service';
import { count } from 'console';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { timesheetInfo } from 'src/app/models/timesheet-data';
import { LeaveService } from 'src/app/services/leave.service';
import { leaveinfo } from 'src/app/models/leave-data';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  viewDate: Date = new Date();
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;
  sheetList:any;
  psheetList:any;
  pendingtimel:any;
  alltimel:any;
  pendingleavel:any;
  allleavel:any;
  

  isSuperAdmin = localStorage.getItem("logRole") == "2" ? true: false;



  error="";
  errorp="";
  approveDropSheetList:any;
  approveDropSheetList2:any;
  leaveDropSheetList:any;
  leaveDropSheetList2:any;

  

  addEvent(): void {
    this.sheetList = [
      ...this.sheetList,
      {        
        prole:'',
        proleid:this.rolecount,
      },
    ];
  };

  paddEvent(): void {
    this.psheetList = [
      ...this.psheetList,
      {        
        pproject:''
      },
    ];
  }

  
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  //End
  minDate = new Date();
  selectedDate = new Date();
  date = new Date();
  myDate = new Date();  
  constructor(private router: Router, private rolesService : RolesService,private projectService : ProjectService, private timesheetService:TimesheetService, public firestore: AngularFirestore,private leaveService:LeaveService) {
    const currentYear = new Date().getFullYear();
    const currentMonth= new Date().getMonth();
    const currentDate =new Date().getDay();
    this.minDate = new Date(currentYear - 0, currentMonth-1, currentDate+39);
   }
  //,public userService:UserService
  //date1 = new Date((new Date().getTime() - 3888000000));
  maxDate = new Date();

  
  tasks:any;
  rolecount:any;

  ngOnInit(): void {
    this.rfetchDataDropDown();
    this.LfetchDataDropDown();
    this.rolescount();
    
  this.selectedDate = new Date();
  this.fetchData(); 
  //this.onChangeEvent(this.selectedDate);  
  this.PfetchData();
  this.ponChangeEvent(this.selectedDate);
  
  }  

  //New
  convert(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }   

  fetchData() {
    this.rolesService.getSheetList().subscribe(data => {             
      var selectedData= data ;
      this.sheetList = selectedData.map(e => {                  
        return {        
          id: e.payload.doc.id,                                                   
          prole:e.payload.doc.get("prole"),
        } as roleInfo;     
     })   
    });      
  } 
  onChangeEvent(event:any){ 
   this.selectedDate = event.target.value;
   this.fetchData();  
  }
update(timesht: roleInfo) {    
  //const user = localStorage.getItem('currentUser');
  
  this.saveupdateSheetList(timesht); 
  
}

saveupdateSheetList(timeSheet: roleInfo){  
  
  if(timeSheet.id==0 || timeSheet.id==null || timeSheet.id=='') 
  {     
     this.firestore.collection('roles').add(timeSheet);
    this.error="Inserted Successfully";
    setTimeout(() => {this.error="";}, 3000);
  }
  else{
   //alert(timeSheet.id);
    this.firestore.doc('roles/'+timeSheet.id).update(timeSheet);
   this.error="Updated Successfully";
  
  setTimeout(() => {this.error="";}, 3000);  
  }   
 }


delete(id: string) {
  this.rolesService.deleteEvent(id);     
  
  this.error="The events was Deleted";
  setTimeout(() => {this.error="";}, 3000);
  
  this.ngOnInit();  
  for(let i = 0; i < this.sheetList.length; ++i){
    if (this.sheetList[i].id === id) {
        this.sheetList.splice(i,1);
   }


  }}


  rolescount() {
    this.firestore.collection('roles').valueChanges()
     .subscribe( result => {
      console.log(result.length);
      this.rolecount=result.length+1;
      console.log(this.rolecount);
     })

  }




    //******************    ///project///       ************************* */

PfetchData() {
  this.projectService.getSheetList().subscribe(data => {             
    var pselectedData= data ;
    this.psheetList = pselectedData.map(e => {                  
      return {        
        id: e.payload.doc.id,                                                   
        pproject:e.payload.doc.get("pproject"),        
      } as projectInfo;     
   })   
  });      
} 
ponChangeEvent(event:any){ 
 this.selectedDate = event.target.value;
 this.PfetchData();  
}
pupdate(ptimesht: projectInfo) {    
//const user = localStorage.getItem('currentUser');

this.psaveupdateSheetList(ptimesht); 

}

psaveupdateSheetList(ptimeSheet: projectInfo){  

if(ptimeSheet.id==0 || ptimeSheet.id==null || ptimeSheet.id=='') 
{     
   this.firestore.collection('projects').add(ptimeSheet);
  this.errorp="Inserted Successfully";
  setTimeout(() => {this.errorp="";}, 3000);
}
else{
 //alert(timeSheet.id);
  this.firestore.doc('projects/'+ptimeSheet.id).update(ptimeSheet);
 this.errorp="Updated Successfully";

setTimeout(() => {this.errorp="";}, 3000);  
}   
}


pdelete(id: string) {
this.projectService.deleteEvent(id);     

this.errorp="The events was Deleted";
setTimeout(() => {this.errorp="";}, 3000);

this.ngOnInit();  
for(let i = 0; i < this.psheetList.length; ++i){
  if (this.psheetList[i].id === id) {
      this.psheetList.splice(i,1);
 }
}
}




//***************************   timesheet   **************************************

rfetchDataDropDown() {

 if (localStorage.getItem("logRole")=="2"){
  this.timesheetService.getSheetList().subscribe(data => { 
    this.alltimel = data.length;           
  var selectedData= data.filter( (record) => {  
 return   localStorage.getItem('currentUser') != record.payload.doc.get("userId")  //this.convert(record.payload.doc.get("modified").toDate()) == this.convert(this.selectedDate) && localStorage.getItem('logProject') == record.payload.doc.get("project") && 
 &&record.payload.doc.get("status")=="pending"//&& localStorage.getItem('logName') != record.payload.doc.get("userName");  
});  

    this.approveDropSheetList = selectedData.map(e => {
                   
      return {        
        id: e.payload.doc.id,                           
        userId:e.payload.doc.get("userId"),   
       status:e.payload.doc.get("status"),  
       userName:e.payload.doc.get("userName")     
      } as timesheetInfo;     
   })  
   console.log(this.approveDropSheetList.length);
        
   this.pendingtimel=(this.approveDropSheetList.length)
    
  }); 
  }




  
  
  else{
    this.timesheetService.getSheetList().subscribe(data => {             
      
      var selectedData= data.filter( (record) => { 
         
     return  localStorage.getItem('logProject') == record.payload.doc.get("project") && localStorage.getItem('currentUser') != record.payload.doc.get("userId")  //this.convert(record.payload.doc.get("modified").toDate()) == this.convert(this.selectedDate) &&
     && localStorage.getItem('logName') != record.payload.doc.get("userName")  
    });  
  
        this.approveDropSheetList = selectedData.map(e => {
          console.log(e.payload.doc.get("modified").toDate());             
          return {        
            id: e.payload.doc.id,                           
            userId:e.payload.doc.get("userId"),   
           status:e.payload.doc.get("status"),  
           userName:e.payload.doc.get("userName")     
          } as timesheetInfo;     
       })  
       this.alltimel=(this.approveDropSheetList.length)     
      
       var selectedData2= data.filter( (record) => { 

       return  localStorage.getItem('logProject') == record.payload.doc.get("project") && localStorage.getItem('currentUser') != record.payload.doc.get("userId")  //this.convert(record.payload.doc.get("modified").toDate()) == this.convert(this.selectedDate) &&
     && localStorage.getItem('logName') != record.payload.doc.get("userName") && record.payload.doc.get("status")=="pending"
       });  
       this.approveDropSheetList2= selectedData2.map(e => {
        console.log(e.payload.doc.get("modified").toDate());             
        return {        
          id: e.payload.doc.id,                           
          userId:e.payload.doc.get("userId"),   
         status:e.payload.doc.get("status"),  
         userName:e.payload.doc.get("userName")     
        } as timesheetInfo;     
     })  
     this.pendingtimel=(this.approveDropSheetList2.length)
      }); 

  }
  } 



  //****************************Leaves************************************ */


  LfetchDataDropDown() {
    if (localStorage.getItem("logRole")=="2"){
      this.leaveService.getLeaveList().subscribe(data => { 
        this.allleavel = data.length; 
        var selectedData3= data.filter( (record) => {  
          return   localStorage.getItem('currentUser') != record.payload.doc.get("userId")  //this.convert(record.payload.doc.get("modified").toDate()) == this.convert(this.selectedDate) && localStorage.getItem('logProject') == record.payload.doc.get("project") && 
          && localStorage.getItem('logName') != record.payload.doc.get("userName") && record.payload.doc.get("status")=="pending" 
         });  
          
        this.leaveDropSheetList = selectedData3.map(e => {        
          return {        
            id: e.payload.doc.id,      
            leavetype:e.payload.doc.get("leavetype"),
            leavereason:e.payload.doc.get("leavereason"),
            datefrom:e.payload.doc.get("datefrom"),
            dateto:e.payload.doc.get("dateto"), 
            userId:e.payload.doc.get("userId"),   
            status:e.payload.doc.get("status"),      
            userName:e.payload.doc.get("userName"),
          } as leaveinfo;     
        })       
        this.pendingleavel=(this.leaveDropSheetList.length)
  
      });  

    }

    else{
    
    this.leaveService.getLeaveList().subscribe(data => { 
      
      var selectedData4= data.filter( (record) => {                 
        return localStorage.getItem('logProject') == record.payload.doc.get("project") 
         && localStorage.getItem('currentUser') != record.payload.doc.get("userId")  //this.convert(record.payload.doc.get("modified").toDate()) == this.convert(this.selectedDate) && localStorage.getItem('logProject') == record.payload.doc.get("project") && 
          && localStorage.getItem('logName') != record.payload.doc.get("userName");  
         });   
        
      this.leaveDropSheetList = selectedData4.map(e => {        
        return {        
          id: e.payload.doc.id,      
          leavetype:e.payload.doc.get("leavetype"),
          leavereason:e.payload.doc.get("leavereason"),
          datefrom:e.payload.doc.get("datefrom"),
          dateto:e.payload.doc.get("dateto"), 
          userId:e.payload.doc.get("userId"),   
          status:e.payload.doc.get("status"),      
          userName:e.payload.doc.get("userName"),
        } as leaveinfo;     
      })       
      this.allleavel=(this.leaveDropSheetList.length)

      var selectedData5= data.filter( (record) => { 

        return localStorage.getItem('logProject') == record.payload.doc.get("project") 
         && localStorage.getItem('currentUser') != record.payload.doc.get("userId")  //this.convert(record.payload.doc.get("modified").toDate()) == this.convert(this.selectedDate) && localStorage.getItem('logProject') == record.payload.doc.get("project") && 
          && localStorage.getItem('logName') != record.payload.doc.get("userName") && record.payload.doc.get("status")=="pending" 
         });   
        this.leaveDropSheetList2= selectedData5.map(e => {
                    
         return {        
          id: e.payload.doc.id,      
          leavetype:e.payload.doc.get("leavetype"),
          leavereason:e.payload.doc.get("leavereason"),
          datefrom:e.payload.doc.get("datefrom"),
          dateto:e.payload.doc.get("dateto"), 
          userId:e.payload.doc.get("userId"),   
          status:e.payload.doc.get("status"),      
          userName:e.payload.doc.get("userName"),
        } as leaveinfo;     
      })  
      this.pendingleavel=(this.leaveDropSheetList2.length)
     // console.log(this.pendingleavel)
       });  
      }} 



  
  fortimelink(){
    this.router.navigate(['/approve-timesheet']);
  }
  forleavelink(){
    this.router.navigate(['/approve-leaverequest']);
  }



}

import { Component, OnInit,Input,Output,EventEmitter,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {ChangeDetectionStrategy,ViewChild,TemplateRef,} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay, isSameMonth, addHours, getDate,} from 'date-fns';
import { EMPTY, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import startOfISOWeekYear from 'date-fns/startOfISOWeekYear';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { timesheetInfo } from 'src/app/models/timesheet-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { id } from 'date-fns/locale';
import { DatePipe } from '@angular/common';
//import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { ReactiveFormsModule } from '@angular/forms';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  // selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  //styleUrls: ['./time-sheet.component.scss']
})


export class TimeSheetComponent implements OnInit {
  //view: CalendarView = CalendarView.Month; 
  //view: CalendarView = CalendarView.Month;  
  //CalendarView = CalendarView;
  
  name:any;
  viewDate: Date = new Date();
  isValidFormSubmitted: boolean | null = null;
  
  refresh = new Subject<void>();
  events: CalendarEvent[] = [  
  ];    

  activeDayIsOpen: boolean = true;
  sheetList:any;
  error='';
  errorMsg = 0;  
  temptotalhours=0;
  temp=0;
  myForm: any;
  fb: any;
  temp2:any;

  addEvent(): void {    
    this.sheetList = [
      ...this.sheetList,
      {        
        task:'',
        description:'',
        hours:'',
        modified: this.selectedDate,
        userId:'',

      },
    ];
  }
 
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  // setView(view: CalendarView) {
  //   this.view = view;
  // }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  //End
  minDate = new Date();
  selectedDate = new Date();
  date = new Date();
  myDate = new Date();  
  exampleForm = new FormGroup ({ firstName: new FormControl(), lastName: new FormControl()});



//   signUpForm = new FormGroup({

      
//     task:new FormControl('',[Validators.required ]),
//     discription:new FormControl('',Validators.required),
//     hours:new FormControl('', [Validators.required]),  
//   },
//    );
// historyRef: any;
// history: any;

  
  constructor(private timesheetService : TimesheetService,public firestore: AngularFirestore,private _formBuilder: FormBuilder) {
    const currentYear = new Date().getFullYear();
    const currentMonth= new Date().getMonth();
    const currentDate =new Date().getDay();
    this.minDate = new Date(currentYear - 0, currentMonth-0, currentDate-15);
   }   
  
  maxDate = new Date();
  curDate = new Date();
  startDay = 1; //0=sunday, 1=monday etc.
  d = this.maxDate.getDay(); //get the current day
  weekStart = new Date(this.maxDate.valueOf() - (this.d<=0 ? 7-this.startDay:this.d-this.startDay)*86400000); //rewind to start day
  weekEnd = new Date(this.weekStart.valueOf() + 6*86400000); //add 6 days to get last day  
  weekStarttemp = this.weekStart;
  tasks:any;

   ngOnInit(): void { 
  this.fetchData();
  this.selectedDate = new Date();
  this.fetchData(); 
  this.onChangeEvent(this.selectedDate);
  this.fetchData();
  this.fetchData();

    // this._buildForm();
}

// private _buildForm() {
//     this.myForm = this.fb.group({
//         task: ['', [Validators.required]],
//         description : ['', [Validators.required]],
//         hours: ['', [Validators.required]]
//     });
// }
  
  convert(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }   

  fetchData() {
    this.timesheetService.getSheetList().subscribe(data => {             
      var selectedData= data.filter( (record) => { 
        
      return this.convert(record.payload.doc.get("modified").toDate()) == this.convert(this.selectedDate) && localStorage.getItem('currentUser') == record.payload.doc.get("userId");  
     
     });  

      this.sheetList = selectedData.map(e => {                  
        return {        
          id: e.payload.doc.id,                                                   
          description:e.payload.doc.get("description"),
          hours:e.payload.doc.get("hours"),
          task:e.payload.doc.get("task"),
          modified:e.payload.doc.get("modified").toDate(),
          userId:e.payload.doc.get("userId"),          
          status:e.payload.doc.get("status"),
          userName:e.payload.doc.get("userName")

        } as timesheetInfo;     
     })   
    });      
  } 
  onChangeEvent(event:any){ 
   
   this.selectedDate = event.target.value;
   
    
   this.fetchData();
  }

  onSelectChange(event:any){
    
    var  value =this.temp+parseInt(event.target.value);
     this.temp =value;
     
  }

//   submit(){ 
//     if((Number(new Date().toISOString().split('-')[0]))-this.signUpForm.value.dob.split('-')[0]>20) {
      
          
//     this.timesheetService.signUp(
//       this.signUpForm.value.task,
//       this.signUpForm.value.description,
//       this.signUpForm.value.hours,
//      this.signUpForm.value.status,
// this.signUpForm.value.userId,
// this.signUpForm.value.userName

//       )     
     
//     }
        
//   } 

  // onFormSubmit() {
	// 	this.isValidFormSubmitted = false;
  //   this.signUpForm.value.task,
  //   this.signUpForm.value.description,
  //   this.signUpForm.value.hours
  // }


// get task(){
//   return this.signUpForm.get('task');
//  }
//  get discription(){
//   return this.signUpForm.get('description');
//  }
//  get hours(){
//   return this.signUpForm.get('hours');
//  }

  insertNewDetails(timesht: timesheetInfo) {

    timesht.userName = localStorage.getItem('logName');
    timesht.userId = localStorage.getItem('currentUser');
    timesht.status = "pending";
    timesht.project = localStorage.getItem('logProject');
    this.saveupdateSheetList(timesht)  

  }

  update(timesht: timesheetInfo) {
    let temp = 0; 
    for (const [key, value] of Object.entries(timesht)) {
     temp = temp +parseInt(value.hours);
    }
    if(temp < 8 ){
    for (const [key, value] of Object.entries(timesht)) {
      if (value.status != 'pending')
        this.insertNewDetails(value);
      else
        this.saveupdate(value);
    }
  
    this.error="Inserted/Update Successfully";
    let theDiv: HTMLElement = document.getElementById("errorMsg") as HTMLElement;
    theDiv.style.display = 'block';
    setTimeout(() => {this.displayErrorMsg();
      }, 3000); 

    }else{
      this.error=" please add only 8 hours";
      let theDiv: HTMLElement = document.getElementById("errorMsg") as HTMLElement;
      theDiv.style.display = 'block';
      setTimeout(() => {this.displayErrorMsg();
        }, 3000);
    }
  }

  displayErrorMsg(){   
    this.errorMsg = 0;
    let theDiv: HTMLElement = document.getElementById("errorMsg") as HTMLElement;
    theDiv.style.display = 'none';       
  }

saveupdateSheetList(timeSheet: timesheetInfo){ 

    this.firestore.collection('timesheet').add(timeSheet);    
    // this.timesheetService.signUp(
//       this.signUpForm.value.task,
//       this.signUpForm.value.description,
//       this.signUpForm.value.hours,
//      this.signUpForm.value.status,
// this.signUpForm.value.userId,
// this.signUpForm.value.userName)
 }
 updatelist(timesht: timesheetInfo) {    
  //const user = localStorage.getItem('currentUser');
  timesht.userName=localStorage.getItem('logName'); 
  timesht.userId = localStorage.getItem('currentUser'); 
  timesht.status= "pending" ;
  timesht.project= localStorage.getItem('logProject'); 
  this.saveupdate(timesht);
  
}

saveupdate(timeSheet: timesheetInfo){   
  this.firestore.doc('timesheet/'+timeSheet.id).update(timeSheet);
 
 }

delete(id: string,event:any) {  

  this.timesheetService.deleteEvent(id);
  for(let i = 0; i < this.sheetList.length; ++i){
          if (this.sheetList[i].id === id) {
            this.sheetList.splice(i,1);  
}
}

this.error="The events was Deleted";
//this.error="Inserted/Update Successfully";
let theDiv: HTMLElement = document.getElementById("errorMsg") as HTMLElement;
theDiv.style.display = 'block';
setTimeout(() => {this.displayErrorMsg();
  }, 3000);  

if(this.sheetList.status=="Pending" && this.error=="The events was Deleted")

this.ngOnInit();
  this.fetchData();
}
}


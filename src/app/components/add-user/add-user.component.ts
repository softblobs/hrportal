import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/compat/storage";
import { AngularFireStorageReference } from '@angular/fire/compat/storage';
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


export function passwordsMatchValidator(): ValidatorFn {
  
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  task:AngularFireUploadTask | undefined;
  ref:AngularFireStorageReference | undefined;
  
  selectedFile:any= File ;
  fb:any;
  downloadURL:Observable<string> | undefined;
  checked = true;  
  hide = true;
  useridcount:number=0;
  enull="";
  roleSheetList: any;
  projectSheetList: any;
  

  //
  //today = new Date();
  
  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }
 minDateyy():string{
  console.log((Number(new Date().toISOString().split('-')[0]))-this.signUpForm.value.dob.split('-')[0]);
   
  return ((Number(new Date().toISOString().split('-')[0]))-12).toString()
 }


  noteList: Observable<ProfileUser[]> | undefined ;
  users: AngularFireList<any> | undefined;

  ud: ProfileUser = {
    email: '',
    password: this.password,
    firstName:'',
    lastName:'',
    doj:'',
    dob:'',
    photoURL:'',
    role:'',
  };


  
  signUpForm = new FormGroup({

      
      firstName:new FormControl('',[Validators.required ,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      lastName:new FormControl('',Validators.pattern('[a-zA-Z][a-zA-Z ]+')),
      email:new FormControl('', [Validators.email,Validators.required]),
      //password: new FormControl('',[ Validators.required,Validators.minLength(8)]),
      //confirmPassword: new FormControl('', Validators.required),
      doj:new FormControl('', Validators.required),
      dob:new FormControl('',Validators.required),
      officeEmail:new FormControl('',Validators.email),
      phone:new FormControl('',[ Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      project:new FormControl('',Validators.required),
      address:new FormControl(''),
      skillSet:new FormControl(''),
      //photoURL: new FormControl(''),
      role:new FormControl('', Validators.required),
      paystatus:new FormControl('1'),
    },
      //{ validators: passwordsMatchValidator()}
     );
  historyRef: any;
  history: any;
  error="";
  minDate = new Date();
  
  


    constructor(private _router: Router,private authService: AuthenticationService, 
      public afs: AngularFirestore,
      public afAuth: AngularFireAuth,private storage: AngularFireStorage,
      public roleservice:RolesService,
      public projectservice:ProjectService,
      ) {
        const currentYear = new Date().getFullYear();
    const currentMonth= new Date().getMonth();
    const currentDate =new Date().getDay();
    this.minDate = new Date(currentYear, currentMonth, currentDate);

        
       } 
      roles =[ {id:1,value:"Admin"},
                   {id:2,value:"Super-Admin"},
                   {id:3,value:"Employee"},
                   {id:4,value:"Other"}

                 ];

  ngOnInit(): void {
    this.lastuser();
    this.rolesnumber();
    this.projectnumber();
    

  }

  get firstName(){
    return this.signUpForm.get('firstName');
   }
   get lastName(){
    return this.signUpForm.get('lastName');
   }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    var numberChars = "0123456789";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var allChars = numberChars + upperChars + lowerChars;
    var randPasswordArray = Array(8);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    var arraypassword=randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] });
    for (var i = arraypassword.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arraypassword[i];
      arraypassword[i] = arraypassword[j];
      arraypassword[j] = temp;
    }
   return arraypassword.join('');
    
     
  }

  get userId(){
   this.useridcount=this.useridcount+1;
   return ("sb-"+this.useridcount);
   
  }
  // get confirmPassword(){
  //   //return this.signUpForm.get('confirmPassword');
  //   return this.passwordUser;
  // }
  get doj(){
    return this.signUpForm.get('doj');
   }
   get dob(){
    return this.signUpForm.get('dob');
   }
   get project(){
    return this.signUpForm.get('project');
   }


   get role(){
    return this.signUpForm.get('role');
   }
   get photoURL(){

     //return this.fb;
     if(this.fb !=null){
      return this.fb;
      
  }
  else{
  return this.enull;
  }
   }
   


   get phone(){
     return this.signUpForm.get("phone")
   }
   get officeEmail (){
    return this.signUpForm.get("officeEmail")
  }
   

   
  
  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  onCheck(): void{
    this.checked = !this.checked;
  }

  onFileSelected(event:any) {
    
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });

    }
    
    submit(){ 
      if((Number(new Date().toISOString().split('-')[0]))-this.signUpForm.value.dob.split('-')[0]>20) {
        
            
      this.authService.signUp(this.signUpForm.value.email,this.password,this.signUpForm.value.firstName,
        this.signUpForm.value.lastName,this.signUpForm.value.doj,this.signUpForm.value.dob,
        this.photoURL,this.signUpForm.value.role,this.userId, 
        this.signUpForm.value.phone,
        this.signUpForm.value.officeEmail,
        this.signUpForm.value.project,
        this.signUpForm.value.address,
        this.signUpForm.value.skillSet,
        this.signUpForm.value.paystatus
        ).then((result) => {
          this.error="Successfully created user";
            setTimeout(() => {this.error="";}, 3000);  //5s        
        })               
        .catch((err) => {         
            this.error="Mail is already exist";
            setTimeout(() => {this.error="";}, 3000);  //5s
        });        
        //this.error="Successfully created user";
        //setTimeout(() => {this.error="";}, 2000);  //5s
        localStorage.setItem('UpdateSt','Yes'); 
      }
      else{
        this.error="DOB should be more than 20 years"
        setTimeout(() => {this.error="";}, 2000);
      }       
    }  
    
   
   
    lastuser() {
      this.afs.collection('users').valueChanges()
       .subscribe( result => {
        console.log(result.length);
        this.useridcount=result.length+100;
        console.log(this.useridcount);
       })
    }


    rolesnumber(){
      this.roleservice.getSheetList().subscribe(data => {             
        var selectedDataa= data  ;            
        this.roleSheetList = selectedDataa.map(e => {                    
          return {        
            id: e.payload.doc.id,                                                                
            prole:e.payload.doc.get("prole"),
            proleid:e.payload.doc.get("proleid")                 
          } as roleInfo;     
       }) 
       console.log(this.roleSheetList)  ;
      }); 
    }
    
    projectnumber(){
      this.projectservice.getSheetList().subscribe(data => {             
        var selectedDataa= data  ;            
        this.projectSheetList = selectedDataa.map(e => {                    
          return {        
            id: e.payload.doc.id,                                                                
            pproject:e.payload.doc.get("pproject"),
                             
          } as projectInfo;     
       }) 
       console.log(this.projectSheetList)  ;
      }); 
    }
  
}

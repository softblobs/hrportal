import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileUser } from 'src/app/models/user-profile';
import {  
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,ReactiveFormsModule ,
  Validators,
  ValidatorFn,
  FormBuilder
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { firstValueFrom } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProjectService } from 'src/app/services/project.service';
import { projectInfo } from 'src/app/models/project-data';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  disabled: boolean = localStorage.getItem("logRole") != "2" ? true: false;
  resetformone= new FormGroup({
    uid:new FormControl(''),  
    id:new FormControl(''),
    firstName:new FormControl('',[Validators.required ,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
    lastName:new FormControl('',Validators.pattern('[a-zA-Z][a-zA-Z ]+')),
    dob:new FormControl('',Validators.required),
    doj:new FormControl('',Validators.required),
    email:new FormControl(''),
    photoURL:new FormControl(''),
    role:new FormControl('',Validators.required),
    userId:new FormControl(''),
    phone:new FormControl('',[ Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
    project:new FormControl('',Validators.required),
    address:new FormControl(''),
    skillSet:new FormControl(''),
    officeEmail:new FormControl('',Validators.email),
    paystatus:new FormControl(''),
   
  });
  editing:boolean=true;
  uid:any;
  checked = true;  
  hide = true;
  newstring:boolean=true;
  selectedUserID = this.userService.selectedUser != null ? this.userService.selectedUser.uid : 0;
  photoURL = this.userService.editSelectedUser.photoURL;
  isEdit = false;
  //issuperAdmin= localStorage.getItem("logRole") == "2" ? true: false;
  issuperAdmin= localStorage.getItem("logRole") == "2" ? true: false ;// && this.isEdit  ? true: false;
  isAdmin = this.userService.selectedUser.role == "1" ? true: false;
  isAdminEdit = this.isAdmin && !this.isEdit ? true : false;
  error="";

  projectSheetList:any;
  
  

  //image
  fb:any;
  downloadURL:Observable<string> | undefined;
  ref:AngularFireStorageReference | undefined;
  task:AngularFireUploadTask | undefined;
  
  constructor(private _router: Router,public userService:UserService,private storage: AngularFireStorage,public afs:AngularFirestore,public projectservice:ProjectService) {
    console.log(this.userService.editSelectedUser)
   }

 // formControls=this.userService.form.controls;
    formControls=this.resetformone.controls;


  ngOnInit(): void {

   // this.populateForm(this.userService.editSelectedUser); 
      this.populateForm(JSON.parse(localStorage.getItem('userdata')!))
      this.photoURL=localStorage.getItem('logUrl');
      this.projectnumber();




    // debugger
    // if(this.isAdmin==true){
    //   this.populateForm(this.userService.editSelectedUser); 
    //    this.photoURL;
    // }
    // else{
    // console.log(this.userService.selectedUser);
    // this.uid=this.userService.selectedUser.id;
    // this.populateForm(this.userService.selectedUser);
    // this.photoURL=this.userService.selectedUser.photoURL;
    // }
    
  }
  get phone(){
    return this.resetformone.get("phone")
  }
  get paystatus(){
   return this.resetformone.get('paystatus');
 }

  get firstName(){
    return this.resetformone.get('firstName');
   }
   get lastName(){
    return this.resetformone.get('lastName');
   }
   get doj(){
    return this.resetformone.get('doj');
   }
   get dob(){
    return this.resetformone.get('dob');
   }
   get project(){
     
    return this.resetformone.value.project
    
   }


   get role(){
    return this.resetformone.get('role');
   }
   get officeEmail (){
    return this.resetformone.get("officeEmail")
  }

  
  onBack(): void {
    //this._router.navigate(['/flexy/home']);
  }

  onCheck(): void{
    this.checked = !this.checked;
  }

  onEdit(): void{
    this.isEdit = true;
    //this._router.navigate(['/add-user']);
  }

  updateUser(){
    //this.userService.updateUser;
    this.isEdit = false;
    

  }
  
  deleteUser(){
    this.userService.deleteUser(this.userService.editSelectedUser.id);
    this._router.navigate(['/manage-users']);
  }

  //chips related code
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  addOnBlur = true;
  selectable = true;
  removable = true;
  
  userSkillSet = [{ name: 'test framework' }];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.userSkillSet.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.userSkillSet.indexOf(fruit);

    if (index >= 0) {
      this.userSkillSet.splice(index, 1);
    }
  }

  updateeditUser():void{

   
    if((Number(new Date().toISOString().split('-')[0]))-this.resetformone.value.dob.split('-')[0]>20) {

    console.log(this.userService.editSelectedUser)
    
    this.afs.collection('users').doc(this.userService.editSelectedUser.id).update({firstName: this.resetformone.value.firstName, lastName:this.resetformone.value.lastName, dob:this.resetformone.value.dob, doj:this.resetformone.value.doj,
      skillSet:this.resetformone.value.skillSet,
      role:this.resetformone.value.role,
      address: this.resetformone.value.address,
      officeEmail: this.resetformone.value.officeEmail,
      phone:this.resetformone.value.phone,
      project:this.project,
      photoURL:this.photoUrl,
      paystatus:this.resetformone.value.paystatus,
    });
      localStorage.setItem('UpdateSt','Yes');
     
    this.error="Succesfully submitted";
    setTimeout(() => {
      this.error="";
  }, 5000);  //5s

    //this._router.navigate(['user-details']); 
    //this._router.navigate(['/user-detail']);   
  }
  else{
    this.error="DOB should be more than 20 years"
    setTimeout(() => {this.error="";}, 2000);
  }

}

  populateForm(user:any){
    this.resetformone.setValue(user);
  }

  get photoUrl(){
    
    if(this.fb !=null){
        return this.fb;
        console.log(this.fb);
    }
    else{
      if(localStorage.getItem("logRole") != "2"){

       return  localStorage.getItem('logUrl');
      }
      else{
     
        return this.userService.editSelectedUser.photoURL;
        }
    }
    

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
              this.photoURL=url;
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




    getToday(): string {
      return new Date().toISOString().split('T')[0]
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

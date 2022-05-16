import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {  
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,ReactiveFormsModule ,
  Validators,
  ValidatorFn,
  FormBuilder
} from '@angular/forms';
import { updateDoc } from '@firebase/firestore';

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
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  
  public showPassword: boolean = false;
  constructor(private _router: Router,public authservice:AuthenticationService,public afAuth: AngularFireAuth) {
    
   }


   resetform= new FormGroup({
      
    
    password: new FormControl('',[ Validators.required,Validators.minLength(8)]),
    confirmPassword: new FormControl('', Validators.required),
  }, { validators: passwordsMatchValidator()});
   error="";
   user$ = this.afAuth.user;


   userid:any;
   username:any;

   passwords="123456789";
   action='2';


  ngOnInit(): void {
   this.userid=localStorage.getItem("loguserid");

   this.username=localStorage.getItem("logName")
  
  }
  
  
  get password(){
    return this.resetform.get('password');
  }

  get confirmPassword() {
    return this.resetform.get('confirmPassword');
  }

  saveUser(){}
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  resetPassword(){
                                              //this.authservice.passwordReset(this.resetform.value.email)
                                               //this.error="please verify your given email address";
    this.afAuth.authState.subscribe(res=>{
      res?.updatePassword(this.resetform.value.password)

      .then(err=>
        this.error="Password Updated" )
    
        .catch(err => {
          this.error="Somthing went wrong please update again"
        
       
        });
        setTimeout(() => {this.error="";}, 3000);
     }
    
    )}

    
}



import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _router: Router,public authservice:AuthenticationService,public afAuth: AngularFireAuth) { }
   error="";
   
  ngOnInit(): void {
    
  }

  resetformone= new FormGroup({
      
    
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('')
  });

  get email() {
    return this.resetformone.get('email');
  }

  
  resetPassword(){
    this.authservice.passwordReset(this.resetformone.value.email).
    then(result=>{
      })
    
    .catch(err => {
      this.error="Please provide registered Email ID.";
      });
      
    this.error="Verification link sent, please verify your Email";
  }

}

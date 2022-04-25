import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  

  constructor(private _router: Router,public authservice:AuthenticationService,public afAuth: AngularFireAuth) { }
   error="";
   user$ = this.afAuth.user;
  ngOnInit(): void {
    
  }

  resetform= new FormGroup({
      
    
    email:new FormControl(''),
    password:new FormControl('')
  });

  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  resetPassword(){
    this.authservice.passwordReset(this.resetform.value.email)
    this.error="please verify your given email address";
  }

}

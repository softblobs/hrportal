import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'firebase/auth';
import { ProfileUser } from 'src/app/models/user-profile';
import firebase from 'firebase/compat';
import { MatTableDataSource } from '@angular/material/table';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';





@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  employeeList: any;
  hospitalsArray=[];
  displayedColumns: string[] = ['uid', 'assigned', 'name', 'doj', 'view'];
  issuperAdmin= localStorage.getItem("logRole") == "2" ? true: false;
    
    //dataSource:firebase.firestore.DocumentData[]=[];
     dataSourceone:any;
    //dataSource:MatTableDataSource<Element>;
     customerArray = [];    
     datasoc:any;
    //dataSource = this.dataSourceone;
    //user:any;
  constructor(private _router: Router,public firestore:AngularFirestore,private userService:UserService ) {
    this.userService.editSelectedUser = null;
   }

  ngOnInit(): void {    
    this.getAllUser();
        
  }


  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  onView(id:any): void{
    console.log(id);
    
    
    this.userService.getAllUsers().subscribe(res=>{
      var selectedData= res.find( ({ uid }) => uid === id )
      console.log(selectedData?.id);
      this.userService.editSelectedUser = selectedData;
      localStorage.setItem('userdata', JSON.stringify(this.userService.editSelectedUser));
      localStorage.setItem('logUrl',this.userService.editSelectedUser.photoURL)

      




      setTimeout(() => {
        console.log('sleep');
        this._router.navigate(['/user-detail']);
        // And any other code that should run only after 5s
      }, 1000);
      //this._router.navigate(['/user-detail']);
    });
    
  
  }
  
  onAddUser(): void{
    this._router.navigate(['/add-user']);    
  }
  
  getAllUser(){

    this.userService.getAllUsers().subscribe(res=>{
      this.dataSourceone=res;
      this.datasoc =new MatTableDataSource(this.dataSourceone);
      //console.log(this.datasoc.data)
      this.customerArray=this.datasoc.data;
    })
  }  
}

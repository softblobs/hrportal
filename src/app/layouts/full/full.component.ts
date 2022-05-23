import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  search: boolean = false;
  selectedUser:any;
  userIcon:string = "";
  isAdmin:boolean = false;
  


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    user$ = this.afAuth.user;

    rolee: string | null;
    photourl:string| null;
  
    
  constructor(private _router: Router, private breakpointObserver: BreakpointObserver,
    public authService: AuthenticationService,public userService:UserService,public afAuth: AngularFireAuth) {
      //this.userName = this.userService.selectedUser?.firstName;
      //this.isAdmin = this.userService.selectedUser?.role == "1" ? true:false;      
      //this.sidebarMenu= this.isAdmin ? this.adminSideBarMenu : this.userSideBarMenu;
      //this.userIcon = this.userService.selectedUser?.photoURL ? this.userService.selectedUser?.photoURL : "assets/images/user2.webp";
    
      // alert(this.userService.selectedUser?.firstName);
       //localStorage.setItem('userName', this.userService.selectedUser?.firstName);
       //console.log(localStorage.getItem('userName'));
       //this.userName=localStorage.getItem('userName');
       this.userName=localStorage.getItem('logName');
       
       console.log(localStorage.getItem('logRole')); 
       
       this.rolee=localStorage.getItem('logRole')
       this.isAdmin = this.rolee== "1" || this.rolee== "2" ? true:false;
       this.photourl=localStorage.getItem('logUrltime');
       console.log(localStorage.getItem('logUrltime'));

       this.sidebarMenu= this.isAdmin ? this.adminSideBarMenu : this.userSideBarMenu;

      this.userIcon = this.photourl ? this.photourl : "assets/images/user2.webp";
    }
  

  routerActive: string = "activelink";

  adminSideBarMenu: sidebarMenu[] = [
    {
      link: "/roles",
      icon: "dns",
      menu: "Dashboard",
    },

    // {
    //   link: "/dashboard",
    //   icon: "home",
    //   menu: "Dashboard",
    // },


    {
      link: "/manage-users",
      icon: "people",
      menu: "Manage Users",
    },
    {
      link: "/calendar",
      icon: "calendar_month",
      menu: "Calendar",
    },
    {
      link: "/vm-details",
      icon: "airplay",
      menu: "Manage VMs",
    },
    {
      link: "/time-sheet",
      icon: "access_time",
      menu: "Time Sheet",
    },
    {
      link: "/applyleave",
      icon: "time_to_leave",
      menu: "Leave Request",
    },
    {
      link: "/leaves-list",
      icon: "format_list_bulleted",
      menu: "Leaves List",
    },
    {
      link: "/approve-timesheet",
      icon: "approval",
      menu: "Approve Timesheet",
    },
    {
      link: "/approve-leaverequest",
      icon: "approval",
      menu: "Approve Leave",
    },
    {
      link: "/pay-info",
      icon: "payment",
      menu: "Pay-Role",
    },
    {
      link: "/generate-payslip",
      icon: "payments",
      menu: "Generate-payslip",
    }

  ]
  userSideBarMenu: sidebarMenu[] = [
    {
      link: "/user-detail",
      icon: "details",
      menu: "User Details",
    },
    {
      link: "/change-password",
      icon: "password",
      menu: "Change Password",
    },
    {
      link: "/calendar",
      icon: "calendar_month",
      menu: "Calendar",
    },
    {
      link: "/time-sheet",
      icon: "access_time",
      menu: "Time Sheet",
    },
    {
      link: "/applyleave",
      icon: "border_color",
      menu: "Leave Request",
    },
    {
      link: "/leaves-list",
      icon: "format_list_bulleted",
      menu: "Leaves List",
    },
    {
      link: "/payslip",
      icon: "note",
      menu: "Payslip",
    }


  ]
  sidebarMenu:any = null;
  userName:any;

  onChangePassword() : void{
    this._router.navigate(['/change-password']);
  }
  
  onViewAccount() : void{
    
    this._router.navigate(['/user-detail']);
  }

  onLogout(){ 

    //localStorage.setItem('UpdateSt',''); 
    this.afAuth.signOut()
    .then(() => {window.location.href = '/login'}
    );
    //localStorage.setItem('UpdateSt','');
   // this._router.navigate(['/login']); 
    localStorage.setItem('UpdateSt','');   
  } 
}
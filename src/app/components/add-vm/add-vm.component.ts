import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { VirtualmachineService } from 'src/app/services/virtualmachine.service';
import { MatDialogRef } from '@angular/material/dialog';
import { VmDetailsComponent } from '../vm-details/vm-details.component';

@Component({
  selector: 'app-add-vm',
  templateUrl: './add-vm.component.html',
  styleUrls: ['./add-vm.component.scss']
})
export class AddVmComponent implements OnInit {
  vmForm = new FormGroup({
      
    vmname:new FormControl(''),
    vmid:new FormControl(''),
    vmusername:new FormControl('', ),
    vmpassword: new FormControl(''),
    vmtype: new FormControl('', ),
    
    
  }
  );

  constructor(private _router: Router, public vmservice:VirtualmachineService,public userservice:UserService,
    private matref:MatDialogRef<VmDetailsComponent>) { }

  ngOnInit(): void {
    
  }
   

  onBack(): void {

    this.vmservice.createvm(this.vmForm.value);
    
    this._router.navigate(['/flexy/home']);
    this.close();
  }

  close(){
    this.matref.close();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent {
  constructor(private router:Router){}
  handleChange(e:any){

  }
  handleSubmit(e:any){
    
  }

  editProfile(){
    this.router.navigateByUrl('onboarding')
  }
}

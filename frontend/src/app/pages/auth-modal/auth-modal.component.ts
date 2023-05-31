import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import axios from 'axios';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent {
  error = ' ';

  isSignIn = false;
  email: string | undefined;
  currentPwd: string | undefined;
  pwdToCheck: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { title: string },
    private cookieService:CookieService
  ) {}

  ngOnInit() {
    this.dialogRef.updateSize('30%', '80%');

    if (this.data.title == 'Log in!') {
      this.isSignIn = true;
    }
  }

  setEmail(e: any) {
    this.email = e.target.value;
  }
  setPwd(e: any) {
    this.currentPwd = e.target.value;
  }

  setConfirmPwd(e: any) {
    this.pwdToCheck = e.target.value;
  }

  submitForm = async (e: any) => {
    e.preventDefault();
    try {
      if (!this.isSignIn && this.pwdToCheck != this.currentPwd) {
        this.error = 'Passwords need to match!';
        return;
      }
      
      const response = await axios.post(`http://localhost:8000/${this.isSignIn ? 'login' : 'signup'}`, { email: this.email, password: this.currentPwd })

      this.cookieService.set('Email', JSON.stringify(this.email))
      this.cookieService.set('UserId', response.data.userId)                                      
      this.cookieService.set('AuthToken', response.data.token)
      

      const success = response.status === 201;
      console.log("🚀 ~ file: auth-modal.component.ts:65 ~ AuthModalComponent ~ submitForm= ~ success:", success)
    
      if (success && !this.isSignIn) {
        this.dialogRef.close()
        this.router.navigateByUrl('onboarding');
      }

      if (success && this.isSignIn) {
        this.dialogRef.close()
        this.router.navigateByUrl('dashboard');

       
      }
      
    } catch (err) {
      console.log(err);
    }
  };
}

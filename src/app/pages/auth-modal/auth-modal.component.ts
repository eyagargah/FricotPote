import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';

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
  currentUser: any;
  offer: any;
  constructor(
    public dialogRef: MatDialogRef<any>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { title: string },
    private cookieService: CookieService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.dialogRef.updateSize('25%', '65%');

    if (this.data.title == 'Log in!') {
      this.isSignIn = true;
    }
  }

   showPwd() {
    console.log('clicked')
    var x = document.getElementById("password-current") as HTMLInputElement;
   
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
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

  async sleep(seconds:any){
    return new Promise((resolve)=> setTimeout(resolve , seconds*1000))
  }

  openSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  
  submitForm = async (e: any) => {
    e.preventDefault();
    try {
      if (!this.isSignIn && this.pwdToCheck != this.currentPwd) {
        this.error = 'Passwords need to match!';
        return;
      }
      if(!this.email || !this.currentPwd){
        this.error = 'Please fill in all fields!';
        return
      }

      const response = await axios.post(
        `https://fricotpote-backend-1.onrender.com/${
          this.isSignIn ? 'login' : 'signup'
        }`,
        { email: this.email, password: this.currentPwd }
      );
      // Store email and user id in cookies for later use
      this.cookieService.set('Email', JSON.stringify(this.email));
      this.cookieService.set('UserId', response.data.userId);
      this.cookieService.set('AuthToken', response.data.token);

      const success = response.status === 201;

      if (success && !this.isSignIn) {
        this.openSpinner();
        await this.sleep(2)
        this.dialogRef.close();
        this.router.navigateByUrl('onboarding');
      }

      if (success && this.isSignIn) {
        this.openSpinner();
        await this.sleep(2)
        this.dialogRef.close();
        this.userService
          .getCurrentUser(this.cookieService.get('UserId'))
          .then((data) => {
            this.currentUser = data;
            this.offer = data.offer;

            if (this.offer != undefined) {
              this.router.navigateByUrl('dashboard');
            } else {
              this.router.navigateByUrl('offer');
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import  axios  from 'axios';
@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent {
  error = ' ';

  isSignUp = false;
  email: string | undefined;
  currentPwd: string | undefined;
  pwdToCheck: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {}

  ngOnInit() {
    this.dialogRef.updateSize('30%', '80%');

    if (this.data.title == 'Log in!') {
      this.isSignUp = true;
    }
  }

  setEmail(e: any) {}
  setPwd(e: any) {
    this.currentPwd = e.target.value;
  }

  setConfirmPwd(e: any) {
    this.pwdToCheck = e.target.value;
  }

  submitForm = async (e: any) => {
    e.preventDefault();
    try {
      if (!this.isSignUp && this.pwdToCheck != this.currentPwd) {
        this.error = 'Passwords need to match!';
        return;
      }
      const response = await axios.post('http://localhost:8000/signup', { email: this.email, currentPwd: this.currentPwd})

      console.log(response)
      const success = response.status === 201;

      if (success) {
        this.router.navigateByUrl('onboarding');
      }
    } catch (err) {
      console.log(err);
    }
  };
}

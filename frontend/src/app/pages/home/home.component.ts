import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private dialog: MatDialog,
    private cookiesServices: CookieService
  ) {}

  authToken = this.cookiesServices.get('AuthToken');
  fileNameDialogRef: MatDialogRef<AuthModalComponent> | undefined;
  btn = document.querySelector('.primary-button')
  openDialog(e:any) {
    console.log(e.target.innerHTML)
    if(e.target.innerHTML == 'Sign out'){
      this.cookiesServices.deleteAll()
    }
    else {
      this.fileNameDialogRef = this.dialog.open(AuthModalComponent, {
        data: { title: 'Create Account' },
      });
    }
   
  }
}

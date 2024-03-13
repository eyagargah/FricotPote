import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private dialog: MatDialog,
    private cookiesServices: CookieService, 
    private router:Router
  ) {}

  authToken = this.cookiesServices.get('AuthToken');
  fileNameDialogRef: MatDialogRef<AuthModalComponent> | undefined;
  btn = document.querySelector('.primary-button')
  openDialog(e:any) {
    if(this.authToken){
      this.cookiesServices.deleteAll()
      this.router.navigateByUrl('home')
    }
    else {
      this.fileNameDialogRef = this.dialog.open(AuthModalComponent, {
        data: { title: 'Create Account' },
      });
    }
   
  }
}

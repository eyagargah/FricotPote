import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent {

  fileNameDialogRef: MatDialogRef<ProfileModalComponent> | undefined;
  constructor(private router:Router, private cookiesservice: CookieService , private dialog: MatDialog){}

  @Input() currentUser: any

  logout(){
    this.cookiesservice.delete('user_id')
    this.cookiesservice.delete('x-access-token')
    this.cookiesservice.delete('x-refresh-token')
    this.router.navigateByUrl('home')
    
  }

  viewProfile(){
    this.fileNameDialogRef = this.dialog.open(ProfileModalComponent  , {
      data: { title: 'My profile'},
    })
  }
}

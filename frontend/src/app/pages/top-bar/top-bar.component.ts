import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  @Input() authToken: any;

  //make logIn button disabled
  disabled = false
  title = 'Get Started';
  minimal = true;
  src = '';
  fileNameDialogRef: MatDialogRef<AuthModalComponent> | undefined;

  constructor(private dialog: MatDialog) {}

  openModal() {
    this.disabled = true
    this.fileNameDialogRef = this.dialog.open(AuthModalComponent  , {
      data: { title: 'Get Started!' },
    })
  }
  ngOnInit(): void {
    let navBtn = document.querySelector('.nav-button') as HTMLButtonElement;
  
    if (this.authToken && this.minimal) {
      navBtn.style.visibility = 'hidden';
    } else {
      navBtn.style.visibility = 'visible';
    }
    if (!this.minimal) {
      this.src = '../../../assets/tinder_logo_white.png';
    } else {
      this.src = '../../../assets/color-logo-tinder.png';
    }
  }
}

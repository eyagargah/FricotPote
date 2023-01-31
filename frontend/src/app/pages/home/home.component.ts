import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  authToken = false
  fileNameDialogRef: MatDialogRef<AuthModalComponent> | undefined;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.fileNameDialogRef = this.dialog.open(AuthModalComponent);
   
  } 
}


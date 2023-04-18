import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent {
  constructor(private router:Router){}
  logout(){
    this.router.navigateByUrl('home')
  }
}

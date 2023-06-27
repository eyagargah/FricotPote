import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent {
  constructor(private router:Router, private cookiesservice: CookieService){}

  @Input() currentUser: any

  logout(){
    this.cookiesservice.delete('UserId')
    this.cookiesservice.delete('AuthToken')
    this.cookiesservice.delete('Email')
    this.router.navigateByUrl('home')
    
  }
}

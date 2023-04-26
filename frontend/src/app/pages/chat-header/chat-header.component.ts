import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent {
  constructor(private router:Router, private cookiesservice: CookieService){}
 

  userId = this.cookiesservice.get('UserId')
  user: any
 ngOnInit(){
  this.getUser()
 }
  getUser= async() =>{
    try {
    const response = await axios.get('http://localhost:8000/user', {
        params: {userId: this.userId}
      })
     this.user = response.data
      console.log("🚀 ~ file: dashboard.component.ts:38 ~ DashboardComponent ~ getUser=async ~ user:", this.user)
      
    }
    catch(err){
      console.log(err)
    }
  }

  logout(){
    this.router.navigateByUrl('home')
  }
}

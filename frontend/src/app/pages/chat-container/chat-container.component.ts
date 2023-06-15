import { Component, Input } from '@angular/core';
import axios from 'axios';
import { CookieOptions, CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent {
  constructor(private cookiesservice: CookieService) {}
  showMatches = true
  showChat= false
  userId = this.cookiesservice.get('UserId');
  @Input() user: any;
  @Input() matches: any

  getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId: this.userId },
      });
      this.user = response.data;
    
    } catch (err) {
      console.log(err);
    }
  };
  
  showMatchSection(){
    console.log(this.showMatches)
    if(this.showMatches == true){
      this.showMatches = false
      this.showChat = true
    }else {
      this.showChat= false
      this.showMatches =true
    }
  }
  showChatSection(){
    console.log(this.showChat)
    if(this.showChat == true){
      this.showMatches = true
      this.showChat = false
    }else {
      this.showChat= true
      this.showMatches =false
    }
  }
}

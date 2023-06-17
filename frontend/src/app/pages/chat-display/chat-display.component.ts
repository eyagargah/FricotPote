import { Component } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.scss'],
})
export class ChatDisplayComponent {
  constructor(private cookiesServices: CookieService){}
  messages: any;
  userId = this.cookiesServices.get('user_id')
  selectedUserId: any
  getMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages' , {params :{ user_id : this.userId , correspondingUserId: this.selectedUserId}});
      this.messages = response.data;
    } catch (err) {
      console.log(err);
    }
  };
}

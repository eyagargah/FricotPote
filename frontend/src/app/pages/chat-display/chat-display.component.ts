import { Component, Input } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.scss'],
})
export class ChatDisplayComponent {
  constructor(
    private cookiesServices: CookieService,
    private userService: UserService
  ) {}
  @Input() currentUser: any;
  userMessages: any;
  userInitMessages: any;
  senderId: any;
  recepientId: any;
  selectedUser: any;
  clickedUserMessages: any;
  messages: any;

  ngOnInit() {
    this.senderId = this.cookiesServices.get('UserId');
    this.selectedUser = this.userService.getSelectedUser();
    this.recepientId = this.selectedUser.user_id;
    this.userMessages = this.getMessages(this.senderId, this.recepientId);
    this.clickedUserMessages = this.getMessages(
      this.recepientId,
      this.senderId
    );
    if(this.userMessages){
      this.userInitMessages = Array.from(this.userMessages)
      console.log(this.userInitMessages)
    }
    
     this.userInitMessages?.forEach((message: { message: any; timestamp: any; }) => {
      console.log(message)
      const formattedMessage = {
        timestamp: message.timestamp,
        name: this.currentUser?.first_name,
        url: this.currentUser?.url,
        message: message.message,
      };

      this.messages.push(formattedMessage)

  })
  }

  getMessages = async (senderId: any, recepientId: any) => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userId: senderId, correspondingUserId: recepientId },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
}

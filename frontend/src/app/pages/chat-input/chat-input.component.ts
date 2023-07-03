import { Component, Input} from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent {
  constructor(private userService: UserService , private cookiesServices:CookieService) {}
  @Input() currentUser:any
  userMessages: any;
  userInitMessages: any;
  senderId: any;
  recepientId: any;
  selectedUser: any;
  clickedUserMessages: any;
  messages: any;

  
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

  sendMsg = async (e: any) => {
    const chatInput = document.querySelector('.msg') as HTMLTextAreaElement;
    const selectedUserId = this.userService.getSelectedUserId();
    const selectedUser= this.userService.getSelectedUser()
    const currentUserId = this.cookiesServices.get('UserId')
    if (selectedUser) {
      const message = {
        timestamp: new Date().toISOString(),
        from_user: currentUserId,
        to_user: selectedUserId,
        message: chatInput.value,
      };

      try {
        await axios.post('http://localhost:8000/message', { message: message });
      } catch (error) {
        console.log(error);
      }
    }
  };
}

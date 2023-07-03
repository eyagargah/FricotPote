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
  
  ngOnInit(){
    this.recepientId = this.userService.getSelectedUserId();
     this.selectedUser= this.userService.getSelectedUser()
     this.senderId = this.cookiesServices.get('UserId')
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

  sendMsg = async (e: any) => {
    const chatInput = document.querySelector('.msg') as HTMLTextAreaElement;
    if (this.selectedUser) {
      const message = {
        timestamp: new Date().toISOString(),
        from_user: this.senderId,
        to_user: this.recepientId,
        message: chatInput.value,
      };

      try {
        await axios.post('http://localhost:8000/message', { message: message });
        this.userMessages = this.getMessages(this.senderId, this.recepientId)
        this.clickedUserMessages = this.getMessages(this.recepientId, this.senderId)
        chatInput.value=""
      } catch (error) {
        console.log(error);
      }
    }
  };
}

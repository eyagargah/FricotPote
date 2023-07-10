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
  messages: any[] = [];
  
  

  ngOnInit() {
    this.senderId = this.cookiesServices.get('UserId');
    this.selectedUser = this.userService.getSelectedUser();
    this.recepientId = this.selectedUser.user_id;

    this.getMessages(this.senderId, this.recepientId).then((data) => {
      this.userMessages = data;

      for (let i = 0; i <= this.userMessages.length; i++) {
        this.messages.push(this.formatMessages(this.userMessages[i]));
      }
      this.messages = this.filterMessages(this.messages);
      this.messages.sort(function (a,b){
        return a.timestamp - b.timestamp
      })

      
    });

    this.getMessages(this.recepientId, this.senderId).then((data) => {
      this.clickedUserMessages = data;
      for (let i = 0; i <= this.clickedUserMessages.length; i++) {

        this.messages.push(this.formatMessages(this.clickedUserMessages[i]));
      }
      this.messages = this.filterMessages(this.messages);
      this.messages.sort(function (a,b){
        return a.timestamp - b.timestamp
      })
      
    });
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

  filterMessages(messages: any) {
    return messages.filter((el: undefined) => el != undefined);
  }

  formatMessages(message:any){
      let formattedMsg = {
        timestamp: message.timestamp,
        url : message.from_user.url,
        message: message.message,
      }
      return formattedMsg
    }
  }



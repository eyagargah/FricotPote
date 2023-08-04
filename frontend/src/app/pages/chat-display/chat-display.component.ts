import { Component, Input } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.scss'],
})
export class ChatDisplayComponent {
  constructor(
    private cookiesServices: CookieService,
    private userService: UserService,
    private messageService: MessageService
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

    this.messageService.getMessages(this.senderId, this.recepientId).then((data) => {
      this.userMessages = data;
      for (let i = 0; i <= this.userMessages.length; i++) {
        this.messages.push(this.messageService.formatMsg((this.userMessages[i])));
      }
      this.messages = this.messageService.filterMessages(this.messages)
      this.messageService.sortMessages(this.messages)
      console.log(this.messages + "messages from sender")
    });


    this.messageService.sortMessages(this.messages)
    this.messageService.getMessages(this.recepientId, this.senderId).then((data) => {
      this.clickedUserMessages = data;
      for (let i = 0; i <= this.clickedUserMessages.length; i++) {
        this.messages.push(this.messageService.formatMsg((this.clickedUserMessages[i])));
      }
      this.messages = this.messageService.filterMessages(this.messages)
      this.messageService.sortMessages(this.messages)
      
      for (let i=0 ; i<=this.messages.length ; i++){
        console.log(this.messages[i].timestamp)
      }

    });
    

  }

 
 
}

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
    setTimeout(this.displayMsg, 2000)
    }
   
  }

  displayMsg(){
    for (let i = 0; i < Object.keys(this.userMessages).length; i++) {
      console.log(
        Object.keys(this.userMessages)[i]
      );
    }
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

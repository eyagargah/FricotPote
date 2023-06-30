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
  constructor(private cookiesServices: CookieService, private userService: UserService){}
  @Input() currentUser:any
  userMessages: any;
  senderId : any
  recepientId: any
  selectedUser: any
  clickedUserMessages: any
  ngOnInit(){
    this.senderId =  this.cookiesServices.get('UserId')
    console.log("🚀 ~ file: chat-display.component.ts:21 ~ ChatDisplayComponent ~ ngOnInit ~ senderId:", this.senderId)
    this.selectedUser = this.userService.getSelectedUser()
    this.recepientId = this.selectedUser.user_id
    console.log("🚀 ~ file: chat-display.component.ts:24 ~ ChatDisplayComponent ~ ngOnInit ~ recepientId:", this.recepientId)
    this.userMessages = this.getMessages(this.senderId, this.recepientId)
    console.log("🚀 ~ file: chat-display.component.ts:24 ~ ChatDisplayComponent ~ ngOnInit ~ userMessages:", this.userMessages)
    this.clickedUserMessages= this.getMessages(this.recepientId, this.senderId)
    console.log("🚀 ~ file: chat-display.component.ts:26 ~ ChatDisplayComponent ~ ngOnInit ~ clickedUserMessages:", this.clickedUserMessages)
  }
 
  getMessages = async (senderId: any, recepientId: any) => {
    try {
      const response = await axios.get('http://localhost:8000/messages' , {params :{ userId : senderId , correspondingUserId: recepientId}});
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
}

import { Component } from '@angular/core';
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
  messages: any;
  userId : any
  selectedUserId: any
  selectedUser: any

  ngOnInit(){
    this.userId =  this.cookiesServices.get('UserId')
    this.selectedUser = this.userService.getSelectedUser()
    this.selectedUserId = this.selectedUser.user_id
    console.log(this.userId)
    console.log(this.selectedUserId)
    this.getMessages()
  }
 
  getMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages' , {params :{ userId : this.userId , correspondingUserId: this.selectedUserId}});
      this.messages = response.data;
      console.log(this.messages)
    } catch (err) {
      console.log(err);
    }
  };
}

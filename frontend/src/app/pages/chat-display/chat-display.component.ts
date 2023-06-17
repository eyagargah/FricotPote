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
  ngOnInit(){
    this.selectedUser = this.userService.getSelectedUser()
    this.selectedUserId = this.selectedUser.user_id
  }
  messages: any;
  userId = this.cookiesServices.get('user_id')
  selectedUserId: any
  selectedUser: any
  getMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/messages' , {params :{ user_id : this.userId , correspondingUserId: this.selectedUserId}});
      this.messages = response.data;
    } catch (err) {
      console.log(err);
    }
  };
}

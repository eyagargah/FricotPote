import { Component, Input } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent {
  constructor(private cookiesservice: CookieService, private userService: UserService) {}
  showMatches = true
  showChat= false
  userId = this.cookiesservice.get('UserId');
  @Input() user: any;
  @Input() matches: any
  selectedUser: any
  getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId: this.userId },
      });
      this.user = response.data;
    
    } catch (err) {
      console.log(err);
    }
  };
  ngOnChange(){
    this.selectedUser = this.userService.getSelectedUser()
    console.log(this.selectedUser)
  }
  showMatchSection(){
    this.selectedUser= null
   
  }
  showChatSection(){
   
  }
}

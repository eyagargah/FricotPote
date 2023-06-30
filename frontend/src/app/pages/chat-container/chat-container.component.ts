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
  userId = this.cookiesservice.get('UserId');
  @Input() currentUser: any;
  @Input() matches: any

  selectedUser= this.userService.getSelectedUser()
  getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId: this.userId },
      });
      this.currentUser = response.data;
    
    } catch (err) {
      console.log(err);
    }
  };
 
  showMatchSection(){
    if(this.showMatches == true){
      this.showMatches = false
    }
    else {
      this.showMatches =true
    }

  }

}

import { Component} from '@angular/core';
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

  sendMsg = async (e: any) => {
    const chatInput = document.querySelector('.msg') as HTMLTextAreaElement;
    const selectedUserId = this.userService.getSelectedUserId();
    const currentUserId = this.cookiesServices.get('UserId')
    if (selectedUserId) {
      const message = {
        timestamp: new Date().toISOString(),
        from_userId: currentUserId,
        to_userId: selectedUserId,
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

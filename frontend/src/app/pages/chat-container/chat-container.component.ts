import { Component, Input } from '@angular/core';
import axios from 'axios';
import { CookieOptions, CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent {
  constructor(private cookiesservice: CookieService) {}
  userId = this.cookiesservice.get('UserId');
  @Input() user: any;

  getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId: this.userId },
      });
      this.user = response.data;
      console.log(
        '🚀 ~ file: dashboard.component.ts:38 ~ DashboardComponent ~ getUser=async ~ user:',
        this.user
      );
    } catch (err) {
      console.log(err);
    }
  };
}

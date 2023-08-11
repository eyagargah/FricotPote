import { Component, Input } from '@angular/core';
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

    
  }

 addMsg(message:any){
  this.messages = [...this.messages, message];
 }
}

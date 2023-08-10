import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent {
  constructor(
    private userService: UserService,
    private cookiesServices: CookieService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) {}
  @Input() currentUser: any;
  senderId: any;
  recepientId: any;
  selectedUser: any;
  chatMessages:any
  @Input() messages: Observable<any> | any;
  ngOnInit() {
    this.messages.subscribe((item: any) => {
      this.chatMessages = [...this.chatMessages, ...item];
      this.cd.markForCheck();
    });
  
    this.recepientId = this.userService.getSelectedUserId();
    this.selectedUser = this.userService.getSelectedUser();
    this.senderId = this.cookiesServices.get('UserId');
  }
  update() {
    this.cd.detectChanges();
  }
  sendMsg = async (e: any) => {
    const chatInput = document.querySelector('.msg') as HTMLTextAreaElement;
    if (this.selectedUser && chatInput.value !== '') {
      const message = {
        timestamp: new Date().toISOString(),
        from_userId: this.senderId,
        from_user: this.currentUser,
        to_userId: this.recepientId,
        to_user: this.selectedUser,
        message: chatInput.value,
      };

      try {
        await axios.post('http://localhost:8000/message', { message: message });
        chatInput.value = '';

      } catch (error) {
        console.log(error);
      }
    }
  };
}

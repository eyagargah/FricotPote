import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
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
    private messageService : MessageService
  ) {}
  @Input() currentUser: any;
  senderId: any;
  recepientId: any;
  selectedUser: any;
  userMessages : any;
  clickedUserMessages : any;
  chatMessages: any;
  @Input() messages: any;
  @Output() msgEvent = new EventEmitter<any>();
  ngOnInit() {
    this.recepientId = this.userService.getSelectedUserId();
    this.selectedUser = this.userService.getSelectedUser();
    this.senderId = this.cookiesServices.get('UserId');
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
        //get messages sent from this user
        this.messageService.getMessages(this.senderId, this.recepientId).then((data) => {
          this.userMessages = data;
          for (let i = 0; i <= this.userMessages.length; i++) {
            this.messages.push(this.messageService.formatMsg((this.userMessages[i])));
          }
          console.table(this.messages)
          this.messages = this.messageService.filterMessages(this.messages)
          this.messageService.sortMessages(this.messages)
        });
    
    
        this.messageService.sortMessages(this.messages)
        this.messageService.getMessages(this.recepientId, this.senderId).then((data) => {
          this.clickedUserMessages = data;
          for (let i = 0; i <= this.clickedUserMessages.length; i++) {
            this.messages.push(this.messageService.formatMsg((this.clickedUserMessages[i])));
          }
          this.messages = this.messageService.filterMessages(this.messages)
          this.messageService.sortMessages(this.messages)
          this.messageService.removeDuplicatesFromMessages(this.messages)

        });
        this.messageService.sortMessages(this.messages)
        chatInput.value = '';
        this.msgEvent.emit(this.messages)
      } catch (error) {
        console.log(error);
      }
    }
  };
}

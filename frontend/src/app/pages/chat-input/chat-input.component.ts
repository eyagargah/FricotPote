import { Component, Input } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent {
  @Input() currentUser: any;
  sendMsg = async (e: any) => {
    const chatInput = document.querySelector('.msg') as HTMLTextAreaElement;
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: this.currentUser,
      to_userId: clickedUserId,
      message: chatInput.value
  }
    console.log(chatInput.value);
    if (chatInput && e.keyCode === 13) {
      try {
        const response = await axios.post('http://localhost:8000/message', {
          message: message,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
}

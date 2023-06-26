import { Component, Input } from '@angular/core';
import axios from 'axios';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent {
  @Input() currentUser: any;
  constructor(private userService: UserService){}
  
  sendMsg = async (e:any) => {
    const chatInput = document.querySelector('.msg') as HTMLTextAreaElement;
    let selectedUserId= this.userService.getSelectedUserId
    let currentUserId = this.currentUser.user_id
    const message = {
        timestamp: new Date().toISOString(),
        from_userId: currentUserId,
        to_userId: selectedUserId,
        message: chatInput.value
    }

    try {
        await axios.post('http://localhost:8000/message', { message:message })
        
    } catch (error) {
        console.log(error)
    }
}
}

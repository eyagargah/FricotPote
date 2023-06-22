import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {

  sendMsg(e:any){
    const chatInput= document.querySelector('.msg') as HTMLTextAreaElement
    console.log(chatInput.value)
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent {

  sendMsg(e:any){
    const textArea = document.querySelector('.msg')?.innerHTML
    console.log(textArea)
  }
}

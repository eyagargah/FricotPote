import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  messages: any = []
  userMessages: any= []
  senderMessages: any= []
  getAllMessages = async(user1 : any , user2: any)=> {
    try {
      const response1 = await axios.get('http://localhost:8000/messages', {
        params: { userId: user1, correspondingUserId: user2 },
      });
      this.userMessages.push (response1.data);
      for (let i = 0; i <= this.userMessages.length; i++) {
        this.messages.push(this.formatMsg((this.userMessages[i])));
      }
      this.messages = this.filterMessages(this.userMessages)
      this.sortMessages(this.messages)
      
      const response2 = await axios.get('http://localhost:8000/messages', {
        params: { userId: user2, correspondingUserId: user1 },
      });
      this.senderMessages.push (response2.data);
      
      for (let i = 0; i <= this.senderMessages.length; i++) {
        this.messages.push(this.formatMsg((this.senderMessages[i])));
      }
      this.messages = this.filterMessages(this.messages)
      this.sortMessages(this.messages)
      
      return this.messages
    } catch (err) {
      console.log(err);
    }
  }
  getMessages = async (senderId: any, recepientId: any) => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userId: senderId, correspondingUserId: recepientId },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  formatMsg(message : any){
    let formattedMsg = {
      timestamp: message.timestamp,
      url : message.from_user.url,
      message: message.message,
    }
    return formattedMsg
  }

  sortMessages(messages:any){
     messages.sort(function(a:any,b:any){
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })
  }

  removeDuplicatesFromMessages(messages:any){
    return messages.filter((item: any,
      index: any) => messages.indexOf(item) === index);
  }

  filterMessages(messages:any){
    return messages.filter((el: undefined) => el != undefined);
  }
}

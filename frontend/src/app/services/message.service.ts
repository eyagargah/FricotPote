import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  messages: any = []
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
    return new Set(messages)
  }
  filterMessages(messages:any){
    return messages.filter((el: undefined) => el != undefined);
  }
}

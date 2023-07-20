import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  messages: any = []
  getMessage = async (senderId: any, recepientId: any) => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userId: senderId, correspondingUserId: recepientId },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  getMessages(){}
  sendMsg(){}

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
      const dateA = Date.parse(a.timestamp)/1000
      const dateB = Date.parse(b.timestamp)/100
      return dateA- dateB
    })
  }

  filterMessages(messages:any){
    return messages.filter((el: undefined) => el != undefined);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  getMessage(){}

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
      return +new Date(a.timestamp) - +new Date(b.timestamp)
    })
  }

  filterMessages(messages:any){
    return messages.filter((el: undefined) => el != undefined);
  }
}

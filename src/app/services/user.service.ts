import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  selectedUser: any
  matches :  any;
  constructor(private cookiesServices: CookieService) { }
  getCurrentUserId(){
    return this.cookiesServices.get('user_id')
  }
 getCurrentUser = async () => {
  try {
    const response = await axios.get('https://fricotpote-backend-1.onrender.com/user',{
      params: {
        userId : this.selectedUser
      }
    })
    let currentUser = response.data
    return currentUser
  } catch(err){
    console.log(err)
  }
 }

  setSelectedUser(user:any){
    this.selectedUser = user
  }
  
  getUnmatchedUsers = async () => {
    try {
      const response = await axios.get('https://fricotpote-backend-1.onrender.com/user', {
        params: { userId: this.selectedUser },
      });
     
      this.matches = this.selectedUser.matches;

    } catch (err) {
      console.log(err);
    }
  };

  getSelectedUser(){
    return this.selectedUser
  }

  getSelectedUserId(){
    return this.selectedUser.user_id
  }
}

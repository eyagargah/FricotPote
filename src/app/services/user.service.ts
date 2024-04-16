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
  getCurrentUser(){
    return this.cookiesServices.get('user_id')
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


  filterUsersByAgeAndDiet(preferedAge: any, preferedDiet: any , users: any){
    let filteredUsers: any[] = [];
    for (let i= 0; i<users.length; i++) {
    if (users[i].age <= preferedAge && users[i].diet == preferedDiet ) {
        filteredUsers = [...filteredUsers, users[i]];
    }
    console.table(filteredUsers)
}
  }
  getSelectedUser(){
    return this.selectedUser
  }

  getSelectedUserId(){
    return this.selectedUser.user_id
  }
}

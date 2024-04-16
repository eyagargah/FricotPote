import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  selectedUser: any
  matches :  any;
  filteredUsers : any
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

  getUsersByAge = async ( age : any) =>{
    try {
      const response = await axios.get('https://fricotpote-backend-1.onrender.com/age-users', {
        params: { userId: this.selectedUser  , age},
      });
      this.filteredUsers = response.data
      return this.filteredUsers
     

    } catch (err) {
      console.log(err);
    }
  }

  getUsersByDiet( diet : any){

  }
  getSelectedUser(){
    return this.selectedUser
  }

  getSelectedUserId(){
    return this.selectedUser.user_id
  }
}

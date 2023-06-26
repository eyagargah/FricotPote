import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  selectedUser: any
  constructor(private cookiesServices: CookieService) { }
  getCurrentUser(){
    return this.cookiesServices.get('user_id')
  }

  setSelectedUser(user:any){
    this.selectedUser = user
  }
  
  getSelectedUser(){
    return this.selectedUser
  }

  getSelectedUserId(){
    return this.selectedUser.user_id
  }
}

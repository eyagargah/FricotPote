import { Component, Input } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

import { ChatDisplayComponent } from '../chat-display/chat-display.component';
@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent {
  constructor(private cookiesService: CookieService, private userService:UserService){}
  userId= this.cookiesService.get('userId')
  @Input() matches: any
  @Input() showMatches: any

  matchedUserIds : any
  matchesData: any
  selectedUser: any
  displayChat: any
  getMatches = async(userId: any)=> {
    try {
      const response = await axios.get('http://localhost:8000/users', {
        params: { userIds: this.matchedUserIds}
      })
      this.matchesData = response.data
    }catch(err){
      console.log(err)
    }
  }


  ngOnInit(){
    //this.matchedUserIds = this.matches.map( (m: { user: { user_id: any; }; }) => m.user.user_id)
    //this.getMatches(this.userId)
  }
 
  getUser(e:any){
    this.selectedUser= e
    console.log(this.selectedUser)
    this.userService.setSelectedUser(this.selectedUser)
    
  }
}

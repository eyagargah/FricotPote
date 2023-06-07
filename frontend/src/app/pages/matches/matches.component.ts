import { Component } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent {
  constructor(private cookiesService:CookieService){}
  userId = this.cookiesService.get('UserId');
  matchedUsers: any
  getMatchedUsers= async()=> {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId: this.userId },
      });
      this.matchedUsers = response.data;
    } 
    catch(err){
      console.log(err)
    }
  
  }
}

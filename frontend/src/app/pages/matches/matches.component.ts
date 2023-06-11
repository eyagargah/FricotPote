import { Component, Input } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent {
  constructor(){}
  @Input() matches: any
  matchedUserIds : any
  getMatches = async(userId: any)=> {
    try {
      const response = await axios.get('http://localhost:8000/users', {
        params: { userIds: this.matchedUserIds}
      })
      this.matches = response.data
    }catch(err){
      console.log(err)
    }
  }
 
  ngOnInit(){
   this.matchedUserIds = this.matches.map( (user_id: any) => user_id)

  }
}

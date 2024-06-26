import { Component, Input } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent {
  constructor(
    private cookiesService: CookieService,
    private userService: UserService
  ) {}
  userId = this.cookiesService.get('userId');
  @Input() matches: any;
  @Input() showMatches: any;
  @Input() currentUser: any;
  matchedUserIds: any;
  matchesData: any;
  selectedUser: any;
  displayChat: any;
  messages:any=[]
  getMatches = async (userId: any) => {
    console.log("clicked")
    try {
      const response = await axios.get('https://fricotpote-backend-1.onrender.com/users', {
        params: { userIds: this.matchedUserIds },
      });
      this.matchesData = response.data;
    } catch (err) {
      console.log(err);
    }
  };

  ngOnInit() {
    //this.matchedUserIds = this.matches.map( (m: { user: { user_id: any; }; }) => m.user.user_id)
    //this.getMatches(this.userId)
  }

  getUser(e: any) {
    this.selectedUser = e;
    this.userService.setSelectedUser(this.selectedUser);
    this.showMatches = false
  }
}

import { animate, keyframes, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import * as kf from './keyframes';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(550, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(550, keyframes(kf.swipeleft))),
    ]),
  ],
})
export class DashboardComponent {
  constructor(private cookiesService: CookieService) {}
  userId = this.cookiesService.get('UserId');
  animationState: string | undefined;
  parentSubject: Subject<string> = new Subject();
  users: any;
  index = 0;
  direction: string = '';
  undo = false;
  user: any;
  gender: any;
  matches: any;
  swipedUserId: any;

  found: boolean = false;
  filteredGenderedUsers: any;

  getSelectedUser(selectedUser: any) {
    if (this.direction == 'right') {
      this.swipedUserId = selectedUser.user_id;
      this.updateMatches(selectedUser);
    }
  }

  updateMatches = async (selectedUser: any) => {
    try {
      const response = await axios.put('http://localhost:8000/addmatch', {
        userId: this.userId,
        matchedUser: selectedUser,
      });
      this.getUser();
      this.found = false;
    } catch (err) {
      console.log(err);
    }
  };

  getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId: this.userId },
      });
      this.user = response.data;
      this.gender = this.user.gender_interest;
      this.matches = this.user.matches;
    } catch (err) {
      console.log(err);
    }
  };

  getGenderedUsers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/gendered-users/',
        {
          params: { gender: this.user.gender_interest },
        }
      );
      this.users = response.data;
    } catch (err) {
      console.log(err);
    }
  };

  ngOnInit() {
    this.parentSubject?.subscribe((event) => {
      this.startAnimation(event);
    });
    this.getUser();
    setTimeout(this.getGenderedUsers, 1000);
  }

  cardAnimation(value: string) {
    this.parentSubject.next(value);
  }

  sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }

  getUserCard(event: any) {
    console.log(event.target);
  }
  async startAnimation(state: any) {
    if (!this.animationState) {
      if (state == 'swiperight') {
        this.direction = 'right';
        this.acceptUser();
      } else {
        this.direction = 'left';
        this.rejectUser();
      }
      this.animationState = state;
      await this.sleep(500);
      this.index += 1;
    }
  }

  rejectUser() {
    console.log('rejected');
    this.undo = false;
  }
  acceptUser() {
    console.log('accepted');
    this.undo = false;
  }
  resetAnimationState(state: any) {
    this.animationState = '';
  }
  sendMsg() {
    console.log('send msg is working');
  }
  reload() {
    this.index--;
    this.undo = true;
  }

  ngOnDestroy() {
    this.parentSubject?.unsubscribe();
  }
}

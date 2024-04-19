import { animate, keyframes, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import * as kf from './keyframes';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { LocationService } from 'src/app/services/location.service';
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
  constructor(
    private cookiesService: CookieService,
    private locationService: LocationService
  ) {}
  userId = this.cookiesService.get('UserId');
  animationState: string | undefined;
  parentSubject: Subject<string> = new Subject();
  users: any;
  index = 0;
  direction: string = '';
  undo = false;
  currentUser: any;
  gender: any;
  matches: any;
  swipedUserId: any;
  unmatchedUsers: any;
  filteredUsers: any = [];
  likes: any;
  found: boolean = false;
  filteredGenderedUsers: any;

  getSelectedUser(selectedUser: any) {
    if (this.direction == 'right' && this.index < this.users.length) {
      this.swipedUserId = selectedUser.user_id;
      //this.updateMatches(selectedUser);
      this.updateLikes(selectedUser);
      this.checkLikes(selectedUser);
    } else {
      alert('no more users');
    }
  }

  filterMatches(matches: any) {
    let newArray = [];

    // Declare an empty object
    let uniqueObject: any = {};

    // Loop for the array elements
    for (let i in matches) {
      // Extract the title
      let userId = matches[i].user.user_id;

      // Use the title as the index
      uniqueObject[userId] = matches[i];
    }

    // Loop to push unique object into array
    for (let i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }

    // Display the unique objects
    return newArray;
  }

  updateMatches = async (selectedUser: any) => {
    try {
      let isMatched = false;
      for (var match in this.matches) {
        let user = this.matches[match].user.user_id;
        if (user === selectedUser.user_id) {
          console.log('add selected user to db!!');
          isMatched = true;
        } else {
          console.log('match already exists!!');
        }

        console.log(
          this.locationService.countDistance(
            this.currentUser.location,
            selectedUser.location
          )
        );
      }
      if (!isMatched) {
        const response = await axios.put(
          'https://fricotpote-backend-1.onrender.com/addmatch',
          {
            userId: this.userId,
            matchedUser: selectedUser,
          }
        );
      }
      this.getUser();

      this.found = false;
    } catch (err) {
      console.log(err);
    }
  };

  checkLikes(selectedUser: any) {
    try {
      for (let i = 0; i < this.likes.length; i++) {
        if (selectedUser.likes.has(this.likes[i])) {
          this.updateMatches(this.likes[i]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  updateLikes = async (selectedUser: any) => {
    try {
      let isLiked = false;
      for (var like in this.likes) {
        let user = this.likes[like].user.user_id;
        if (user === selectedUser.user_id) {
          console.log('add selected user to db!!');
          isLiked = true;
        } else {
          console.log('this user is  already liked!!');
        }
      }
      if (!isLiked) {
        const response = await axios.put(
          'https://fricotpote-backend-1.onrender.com/addlike',
          {
            userId: this.userId,
            likedUser: selectedUser,
          }
        );
      }
      this.getUser();
    } catch (err) {
      console.log(err);
    }
  };

  getUser = async () => {
    try {
      const response = await axios.get(
        'https://fricotpote-backend-1.onrender.com/user',
        {
          params: { userId: this.userId },
        }
      );
      this.currentUser = response.data;
      this.gender = this.currentUser.gender_interest;
      this.matches = this.currentUser.matches;

      this.matches = this.filterMatches(this.matches);
    } catch (err) {
      console.log(err);
    }
  };

  getGenderedUsers = async () => {
    try {
      const response = await axios.get(
        'https://fricotpote-backend-1.onrender.com/gendered-users/',
        {
          params: { gender: this.currentUser.gender_interest },
        }
      );
      this.users = response.data;
      this.filterUsersByPreferences();
      //this.unmatchedUsers = this.users.filter((user:any) => !this.matches.some((obj:any) => obj._id === user._id));
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

  filterUsersByPreferences() {
    for (let i = 0; i < this.users.length; i++) {
      let distance = this.locationService.countDistance(
        this.currentUser.location,
        this.users[i].location
      );
      if (
        distance <= this.currentUser.distance &&
        this.users[i].age <= this.currentUser.age_preference &&
        this.users[i].diet == this.currentUser.diet
      ) {
        this.filteredUsers.push(this.users[i]);
      }
    }
    console.table(this.filteredUsers);
  }

  cardAnimation(value: string) {
    if (this.index <= this.users.length - 1) {
      this.parentSubject.next(value);
    } else {
      alert('no more users ');
      let cardContainer = document.querySelector('.swipe');
      cardContainer?.classList.remove('transition');
    }
  }

  sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
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

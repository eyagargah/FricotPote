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
  filteredGenderedUsers: any;

  ngOnInit() {
    this.parentSubject?.subscribe((event) => {
      this.startAnimation(event);
    });

    setTimeout(this.getUser, 500);
    setTimeout(this.getGenderedUsers, 1000);
    setTimeout(this.updateMatchedUsers,1100)
    
  }

  getSelectedUser(selectedUser: any) {
    if (this.direction == 'right') {
      this.swipedUserId = selectedUser.user_id;
      this.updateLikes(selectedUser);
      this.checkLikes(selectedUser);
      this.updateMatchedUsers();
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

  updateMatches = async (selectedUser: any, user_id: any) => {
    try {
      let isMatched = false;
      for (var match in this.matches) {
        let user = this.matches[match].user.user_id;
        if (user === selectedUser.user_id) {
          isMatched = true;
        } else {
          console.log('match already exists!!');
        }
      }
      if (!isMatched) {
        const response = await axios.put(
          'https://fricotpote-backend-1.onrender.com/addmatch',
          {
            userId: user_id,
            matchedUser: selectedUser,
          }
        );
      }
      this.getUser();
    } catch (err) {
      console.log(err);
    }
  };

  //update matches if two users liked each other (swiped right)
  updateMatchedUsers = async () => {
    for (let i = 0; i < this.likes.length; i++) {
      for (let j = 0; j < this.likes[i].user.likes.length; j++) {
        console.table(this.likes[i].user.likes[j])
        if (
          this.likes[i].user.likes[j].user.user_id == this.currentUser.user_id
        ) {
          
          this.updateMatches(
            this.likes[i].user.likes[j].user.user_id,
            this.currentUser
          );
          //update the swiped user match lists
          this.updateMatches(
            this.userId,
            this.likes[i].user.likes[j].user

          );
        }
      }
    }
   
  };

  //check if current card (user) swiped right on me
  checkLikes = async (selectedUser: any) => {
    try {
      for (let i = 0; i < this.filteredUsers.length; i++) {
        for (let j = 0; j < this.filteredUsers[i].likes.length; j++) {
          if (selectedUser.likes[j].user.user_id == this.currentUser.user_id) {
            this.updateMatches(selectedUser, this.userId);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  updateLikes = async (selectedUser: any) => {
    try {
      let isLiked = false;
      for (var like in this.likes) {
        let user = this.likes[like].user.user_id;
        if (user == selectedUser.user_id) {
          isLiked = true;
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
      this.likes = this.currentUser.likes;
      this.matches = this.filterMatches(this.matches);
    } catch (err) {
      console.log(err);
    }
  };

  getUnmatchedUsers = async () => {
    for (let i = 0; i < this.filteredUsers.length; i++) {
      for (let j = 0; j < this.currentUser.likes.length; j++) {
        if (
          this.currentUser.likes[j].user.user_id ==
          this.filteredUsers[i].user_id
        ) {
          this.filteredUsers.splice(i, 1);
        }
      }
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
      this.updateMatchedUsers();
      //this.unmatchedUsers = this.users.filter((user:any) => !this.matches.some((obj:any) => obj._id === user._id));
    } catch (err) {
      console.log(err);
    }
  };

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
    this.getUnmatchedUsers();
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
 
  reload() {
    this.index--;
    this.undo = true;
  }

  ngOnDestroy() {
    this.parentSubject?.unsubscribe();
  }
}

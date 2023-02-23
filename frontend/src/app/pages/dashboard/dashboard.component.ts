import { animate, keyframes, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import * as kf from './keyframes';
import data from './users.json';
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
  animationState: string | undefined;
  parentSubject: Subject<string> = new Subject();
  users = data;
  index = 0;
  direction: string = '';
  undo = false
  ngOnInit() {
    this.parentSubject?.subscribe((event) => {
      this.startAnimation(event);
    });
  }

  cardAnimation(value: string) {
    this.parentSubject.next(value);
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
    this.undo= false

  }
  acceptUser() {
    console.log('accepted');
    this.undo= false
  }
  resetAnimationState(state: any) {
    this.animationState = '';
  }
  sendMsg() {
    console.log('send msg is working');
  }
  reload() {
    this.index--
    this.undo = true
  }

  ngOnDestroy() {
    this.parentSubject?.unsubscribe();
  }
}

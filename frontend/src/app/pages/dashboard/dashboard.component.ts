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
  public users = data;
  public index = 0;
  constructor() {}
  direction : string = ""

  sendMsg() {
    console.log('send msg is working');
  }
  cardAnimation(value: string) {
    this.parentSubject.next(value);
  }
  ngOnInit() {
    this.parentSubject?.subscribe((event) => {
      this.startAnimation(event);
    });
  }

  sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }
  async startAnimation(state: any) {
    if (!this.animationState) {
      if (state == 'swiperight'){
        this.direction = 'right'
        this.acceptUser()
      }else {
        this.direction = "left"
        this.rejectUser()
      }
      console.log(state);
      this.animationState = state;
      await this.sleep(500);
      this.index += 1;
    }
  }
  rejectUser(){
    console.log('rejected')
  }
  acceptUser(){
    console.log('accepted')
  }
  resetAnimationState(state: any) {
    this.animationState = '';
  }

  ngOnDestroy() {
    this.parentSubject?.unsubscribe();
  }
}

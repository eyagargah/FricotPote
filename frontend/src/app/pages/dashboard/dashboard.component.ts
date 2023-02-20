import { animate, keyframes, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import * as kf from './keyframes';
import data from './users.json';
import { User } from './user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(550, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(550, keyframes(kf.swipeleft)))
    ])]
})

export class DashboardComponent {
  animationState: string | undefined;
  parentSubject:Subject<string> = new Subject();
  public users: User[] = data;
  public index = 0;
  constructor() {

  }

  sendMsg(){
    console.log('send msg is working')
  }
 cardAnimation(value : string) {
    this.parentSubject.next(value);
  }
  ngOnInit() {
    this.parentSubject?.subscribe(event => {
      this.startAnimation(event)
    });
  }

  sleep(ms: number){
    return new Promise(res => setTimeout(res , ms))
  }
  async startAnimation(state: any) {
    if (!this.animationState) {
      this.animationState = state;
      await this.sleep(500)
      this.index+=1;
      

    }
  }

  resetAnimationState(state: any) {
    this.animationState = '';
  }


  ngOnDestroy() {
    this.parentSubject?.unsubscribe();
  }

}

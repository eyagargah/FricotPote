import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  @Input() authToken: any;

  minimal = true;
  src = '';
  constructor() {}
  ngOnInit(): void {
    let navBtn = document.querySelector('.nav-button')as HTMLButtonElement

    if (this.authToken && this.minimal){
      navBtn.style.visibility='hidden'
    }
    else {
      navBtn.style.visibility="visible"
    }
    if (!this.minimal) {
      this.src = '../../../assets/tinder_logo_white.png';
    } else {
      this.src = '../../../assets/color-logo-tinder.png';
    }
  }
}

import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  
  dataDb = [
    {
      name: 'Elon Musk',
      url: '../assets/users/elon.jpg',
    },
    {
      name: 'Oprah Winfrey',
      url: '../assets/users/oprah.jpg',
    },
    {
      name: 'Adam Sandler',
      url: '../assets/users/adam.jpg',
    },
    {
      name: 'Kevin James',
      url: '../assets/users/kevin.jpg',
    },
    {
      name: 'Drew Barrymore',
      url: '../assets/users/drew.jpg',
    },
  ];

  
}

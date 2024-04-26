import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent {
  constructor(private router:Router){}
  skipOffer(){
    this.router.navigateByUrl('dashboard')
  }
}

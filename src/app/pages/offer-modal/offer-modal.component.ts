import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-modal',
  templateUrl: './offer-modal.component.html',
  styleUrls: ['./offer-modal.component.scss']
})
export class OfferModalComponent {
  constructor(private router:Router){}
submit(){
  this.router.navigateByUrl('offer');
}
}

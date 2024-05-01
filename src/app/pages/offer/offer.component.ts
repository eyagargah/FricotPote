import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent {
  constructor(private router:Router , private cookiesservice:CookieService){}
  formData = {
    user_id: this.cookiesservice.get('UserId'),
    dateTime :''
  }
  skipOffer(){
    this.router.navigateByUrl('dashboard')
  }
  handleChange(event:any){
    const value = event.target.value
    const name = event.target.name;

    switch(name){
      case 'dateTime': 
      this.formData.dateTime = value;
    }
  }
  

  handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e.target)
  };
}

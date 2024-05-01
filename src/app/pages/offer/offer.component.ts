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
  }
  skipOffer(){
    this.router.navigateByUrl('dashboard')
  }
  handleChange(e:any){

  }
  

  handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://fricotpote-backend-1.onrender.com/user`,
        {
          formData: this.formData,
        }
      );
      const succes = response.status === 200;

      if (succes) this.router.navigateByUrl('preference');
    } catch (err) {
      console.log(err);
    }
  };
}

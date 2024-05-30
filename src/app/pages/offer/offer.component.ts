import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent {
  constructor(private router: Router, private cookiesservice: CookieService) {}

  formData = {
    user_id: this.cookiesservice.get('UserId'),
    date: '',
    dateTime: '',
    payment : ''
  };
  skipOffer() {
    this.router.navigateByUrl('dashboard');
  }
  handleChange(event: any) {
    const value = event.target.value;
    const name = event.target.name;
    switch (name) {
      case 'dateTime':
        this.formData.dateTime = value;
        break;
      case 'date':
        this.formData.date = value;
        break;
      case 'payment':
        this.formData.payment = value;
        break
    }
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://fricotpote-backend-1.onrender.com/addoffer`,
        {
          formData: this.formData,
        }
      );
      const succes = response.status === 200;

      if (succes) this.router.navigateByUrl('dashboard');
    } catch (err) {
      console.log(err);
    }
  };
}

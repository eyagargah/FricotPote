import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss'],
})
export class PreferenceComponent {
  constructor(private cookiesservice: CookieService){}
  formData = {
    user_id : this.cookiesservice.get('UserId'),
    
  }
  handleChange(e: any) {}

  handleSubmit(e: any) {}

  async getLocation() {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://map-places.p.rapidapi.com/queryautocomplete/json',
      params: {
        input: 'pizza near Sydney',
        radius: '50000',
      },
      headers: {
        'X-RapidAPI-Key': '390ad486a1mshad7d5a1836bba4ep1285e6jsn91be75833afa',
        'X-RapidAPI-Host': 'map-places.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}

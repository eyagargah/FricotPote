import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss'],
})
export class PreferenceComponent {
  constructor(
    private cookiesservice: CookieService,
    private locationservice: LocationService
  ) {}

  formData = {
    user_id: this.cookiesservice.get('UserId'),
    location: '',
    diet: '',
    age_preference: '',
    distance: '',
  };
  handleChange(event: any) {
    const value = event.target.value;
    const name = event.target.name;
    console.log(event.target.checked);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log(this.formData)
  }

  async getCurrentLocation() {
    const position: any = await this.locationservice.getCurrentLocation();
    const longitude = position.lng;
    this.locationservice.setLongitude(longitude);
    const latitude = position.lat;
    this.locationservice.setLatitude(latitude);
    console.log(longitude)
    console.log(latitude)
    this.locationservice.getNearestCities(longitude , latitude)
  }


  async getLocation() {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://map-places.p.rapidapi.com/queryautocomplete/json',
      params: {
        input: 'pizza near Tunis',
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

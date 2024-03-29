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

  cities: any;
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
    console.log(name + ' : ' + value);
    switch (name) {
      case 'maximumAge':
        this.formData.age_preference = value;
        break;
      case 'maximumDistance':
        this.formData.distance = value;
        break;
      case 'dietairy_preferences':
        this.formData.diet = value;
        break;
      case 'location':
        this.formData.location = this.locationservice.city;
        break;
    }
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log(this.formData);
  }

  async getCurrentLocation() {
    const position: any = await this.locationservice.getCurrentLocation();
    const longitude = position.lng;
    this.locationservice.setLongitude(longitude);
    const latitude = position.lat;
    this.locationservice.setLatitude(latitude);
    this.locationservice.getNearestCities(longitude, latitude).then((data) => {
      this.cities = data;
      this.formData.location = this.cities[0]
      console.log(this.cities);
    });
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

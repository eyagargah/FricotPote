import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
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
    private locationservice: LocationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCurrentLocation();
    this.distance = document.querySelectorAll('input')[0].value;
    this.maxAge = document.querySelectorAll('input')[1].value;
  }

  cities: any;
  currentLocation: any;
  distance: any;
  maxAge: any;
  formData = {
    user_id: this.cookiesservice.get('UserId'),
    location: '',
    diet: '',
    age_preference: '18',
    distance: '5000',
  };
  handleChange(event: any) {
    const value = event.target.value;
    const name = event.target.name;
    switch (name) {
      case 'maximumAge':
        this.formData.age_preference = value;
        break;
      case 'maximumDistance':
        this.formData.distance = value;
        this.locationservice.setRadius(Number(value));
        break;
      case 'dietairy_preferences':
        this.formData.diet = value;
        break;
      case 'location':
        this.formData.location = this.locationservice.city;
        break;
    }
  }

  refreshLocation() {
    this.getCurrentLocation();
    console.log(this.currentLocation);
  }
  async handleSubmit(e: any) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://fricotpote-backend-1.onrender.com/user-preferences`,
        {
          formData: this.formData,
        }
      );
      const succes = response.status === 200;

      if (succes) this.router.navigateByUrl('offer');
    } catch (err) {
      console.log(err);
    }
  }

  async getCurrentLocation() {
    const position: any = await this.locationservice.getCurrentLocation();
    const longitude = position.lng;
    this.locationservice.setLongitude(longitude);
    const latitude = position.lat;
    this.locationservice.setLatitude(latitude);
    this.locationservice.getNearestCities(longitude, latitude).then((data) => {
      this.cities = data;
      this.currentLocation =
        this.cities[0].City + ' ,' + this.cities[0].Country;
      this.formData.location = this.cities[0];
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
    } catch (error) {
      console.error(error);
    }
  }
}

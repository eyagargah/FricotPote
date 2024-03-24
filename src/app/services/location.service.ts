import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}
  radius: number | undefined;
  longitude: any
  latitude:any
  city:any
  getPlacesNearMe() {}

cities:any
  async getNearestCities(longitude : any , latitude:any) {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
      params: {
        latitude: latitude,
        longitude: longitude,
        range: '0',
      },
      headers: {
        'X-RapidAPI-Key': '390ad486a1mshad7d5a1836bba4ep1285e6jsn91be75833afa',
        'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      this.city = response.data[0].City
      this.cities= response.data
    } catch (error) {
      console.error(error);
    }
  }
  
  async getLocation(radius: number, search: string) {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://map-places.p.rapidapi.com/queryautocomplete/json',
      params: {
        input: search,
        radius: radius,
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

  setMapRadius() {}
  getRadius() {
    return this.radius;
  }

  getLongitude(){
    return this.longitude
  }

  setLongitude( longitude:any){
    this.longitude = longitude
  }

  getLatitude(){
    return this.latitude
  }

  setLatitude( latitude:any){
    this.latitude = latitude
  }

  setRadius(radius: number) {
    this.radius = radius;
  }
  setSearchLocation() {}

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = {
                lat,
                lng,
              };
              resolve(location);
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
}

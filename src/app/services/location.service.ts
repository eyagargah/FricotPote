import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

    getPlacesNearMe(){

  }
  
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

  setMapRadius(){

  }

  setSearchLocation(){

  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              console.log(
                'Latitude: ' +
                  position.coords.latitude +
                  'Longitude: ' +
                  position.coords.longitude
              );
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

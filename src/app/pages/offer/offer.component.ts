import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent {
  constructor(private router: Router, private cookiesservice: CookieService , private locationService: LocationService , private userService: UserService ) {}
  currentUser : any
  ngOnInit(){
    this.userService.getCurrentUser(this.cookiesservice.get('UserId')).then((x)=> {
      this.currentUser = x
    })
    console.log(this.currentUser)
  }
  formData = {
    user_id: this.cookiesservice.get('UserId'),
    date: '',
    dateTime: '',
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {
  constructor(private router: Router, private cookiesservice: CookieService) {}
  src = '';
  formData = {
    user_id: this.cookiesservice.get('UserId'),
    first_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: '',
    gender_interest: '',
    url: '',
    about: '',
    matches: [],
  };

  handleChange(event: any) {
    const value = event.target.value;
    const name = event.target.name;
    console.log(event.target.checked);
    console.log(name);
    switch (name) {
      case 'first_name':
        this.formData.first_name = value;
        break;
      case 'dob_day':
        this.formData.dob_day = value;
        break;
      case 'dob_month':
        this.formData.dob_month = value;
        break;
      case 'dob_year':
        this.formData.dob_year = value;
        break;
      case 'show_gender':
        this.formData.show_gender = event.target.checked;
        break;
      case 'gender_identity':
        this.formData.gender_identity = value;
        break;
      case 'gender_interest':
        this.formData.gender_interest = value;
        break;

      case 'url':
        this.src = value;
        this.formData.url = value;
        break;
      case 'about':
        this.formData.about = value;
        break;
    }
    console.log(this.formData);
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/user`, {
        formData: this.formData,
      });
      const succes = response.status === 200;

      if (succes) this.router.navigateByUrl('dashboard');
    } catch (err) {
      console.log(err);
    }
  };
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {
  formData = {
    user_id:"",
    first_name: "",
    dob_day:"",
    dob_month:"",
    dob_year:"",
    show_gender:false,
    gender_identity:"man",
    gender_interest:"woman",
    email:"",
    url:"",
    about:"",
    matches: []

  }

  handleChange(event:any){
    const value = event.target.value
    const name = event.target.name
    console.log('value: '+ value)
    console.log('name: '+ name)
  }

  handleSubmit(){

  }
}

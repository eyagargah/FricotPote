import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { PreferenceComponent } from './pages/preference/preference.component';
import { OfferComponent } from './pages/offer/offer.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'onboarding', component: OnboardingComponent}, 
  {path:'preference' , component: PreferenceComponent},
  {path:'offer' , component: OfferComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

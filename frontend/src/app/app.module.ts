import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { TopBarComponent } from './pages/top-bar/top-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { AuthModalComponent } from './pages/auth-modal/auth-modal.component';

import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TopBarComponent,
    HomeComponent,
    DashboardComponent,
    OnboardingComponent,
    AuthModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MatIconModule, MatDialogModule],
  entryComponents: [AuthModalComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { TopBarComponent } from './pages/top-bar/top-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { AuthModalComponent } from './pages/auth-modal/auth-modal.component';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatContainerComponent } from './pages/chat-container/chat-container.component';
import { ChatHeaderComponent } from './pages/chat-header/chat-header.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { ChatDisplayComponent } from './pages/chat-display/chat-display.component';
import { ChatInputComponent } from './pages/chat-input/chat-input.component';
import { CookieService } from 'ngx-cookie-service';
import { PreferenceComponent } from './pages/preference/preference.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { OfferComponent } from './pages/offer/offer.component';
import { ProfileModalComponent } from './pages/profile-modal/profile-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PageLoaderComponent } from './pages/page-loader/page-loader.component';
import { MatchedModalComponent } from './pages/matched-modal/matched-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TopBarComponent,
    HomeComponent,
    DashboardComponent,
    OnboardingComponent,
    AuthModalComponent,
    ChatContainerComponent,
    ChatHeaderComponent,
    MatchesComponent,
    ChatDisplayComponent,
    ChatInputComponent,
    PreferenceComponent,
    ChatsComponent,
    OfferComponent,
    ProfileModalComponent,
    PageLoaderComponent,
    MatchedModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HammerModule,
    NgxSpinnerModule,
  ],
  entryComponents: [AuthModalComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

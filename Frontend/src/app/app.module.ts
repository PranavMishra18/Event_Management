import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';
import { DashboardComponent } from './events/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventsComponent } from './events/events/events.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { DeptCoordComponent } from './events/authorities/dept-coord/dept-coord.component';
import { HodComponent } from './events/authorities/hod/hod.component';
import { DeanComponent } from './events/authorities/dean/dean.component';
import { IqacComponent } from './events/authorities/iqac/iqac.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';
import { ViewEventComponent } from './events/view-event/view-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DcApprovedComponent } from './events/approved-events/dc-approved/dc-approved.component';
import { HodApprovedComponent } from './events/approved-events/hod-approved/hod-approved.component';
import { DeanApprovedComponent } from './events/approved-events/dean-approved/dean-approved.component';
import { IqacApprovedComponent } from './events/approved-events/iqac-approved/iqac-approved.component';
import { ApprovedComponent } from './events/approved-events/approved/approved.component';
import { ForgotPasswordComponent } from './login-register/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login-register/reset-password/reset-password.component';
import { VerifyOtpComponent } from './login-register/verify-otp/verify-otp.component';

@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    EventsComponent,
    CreateEventComponent,
    EventsListComponent,
    DeptCoordComponent,
    HodComponent,
    DeanComponent,
    IqacComponent,
    EditEventComponent,
    ViewEventComponent,
    ConfirmDialogComponent,
    DcApprovedComponent,
    HodApprovedComponent,
    DeanApprovedComponent,
    IqacApprovedComponent,
    ApprovedComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyOtpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

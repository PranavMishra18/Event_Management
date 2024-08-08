import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';
import { DashboardComponent } from './events/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';
import { ViewEventComponent } from './events/view-event/view-event.component';
import { ApprovedComponent } from './events/approved-events/approved/approved.component';

const routes: Routes = [

  {path : 'login',component:LoginComponent},
  {path : 'register',component:RegisterComponent},
  {path : 'home',component:HomeComponent},
  {path : 'dashboard',component : DashboardComponent,canActivate:[AuthGuard]},
  {path : 'event/create',component:CreateEventComponent,canActivate:[AuthGuard]},
  {path : 'event/edit/:id',component:EditEventComponent,canActivate:[AuthGuard]},
  {path : 'event/view/:id',component: ViewEventComponent, canActivate:[AuthGuard]},
  {path: 'events/approved',component:ApprovedComponent,canActivate:[AuthGuard]},
  {path : 'events/list',component:EventsListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
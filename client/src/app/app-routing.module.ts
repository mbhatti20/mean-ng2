import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import {  DashboardComponent } from './components/dashboard/dashboard.component';
import {  RegisterComponent } from './components/register/register.component';
import {  LoginComponent } from './components/login/login.component';
import {  ProfileComponent } from './components/profile/profile.component';
//import {  AuthGuard } from './guards/auth.guard';




const appRoutes: Routes = [
  { path: 'home',
  component:HomeComponent
    },
    { path: 'dashboard',
  component: DashboardComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'profile',
  component:ProfileComponent
},

{ path: 'register',
component: RegisterComponent
  }

];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }

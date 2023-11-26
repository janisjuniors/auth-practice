import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { userDataResolver } from './resolvers/user-data.resolver';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    canActivate: [authGuard],
    component: HomeComponent,
    resolve: { userDataResolver },
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterComponent
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  }
];

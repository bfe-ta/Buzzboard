import { Routes } from '@angular/router';
import { LoginComponent } from './features/components/login/login.component';
import { DashboardComponent } from './features/components/dashboard/dashboard.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
];


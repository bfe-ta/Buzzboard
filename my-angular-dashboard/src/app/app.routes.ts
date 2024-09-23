import { Routes } from '@angular/router';
// Import feature components
import { LoginComponent } from './features/components/login/login.component';
import { AdminPanelComponent } from './features/components/adminpanel/adminpanel.component';
import { DashboardComponent } from './features/components/dashboard/dashboard.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AdminGuard } from './core/auth/admin.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard] },
];



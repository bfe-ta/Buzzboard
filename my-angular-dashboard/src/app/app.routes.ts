import { Routes } from '@angular/router';
import { LoginComponent } from './features/components/login/login.component';
import { AdminPanelComponent } from './features/components/adminpanel/adminpanel.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AdminGuard } from './core/auth/admin.guard';
import { dashboardRoutes } from './features/components/dashboard/dashboard.routes';
import { adminRoutes } from './features/components/adminpanel/adminpanel.routes';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    children: dashboardRoutes,  // Register dashboard child routes here
    canActivate: [AuthGuard] 
  },
  { path: 'admin', children: adminRoutes, canActivate: [AdminGuard] },
];



import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('type'); // Store user type in localStorage

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if the user type matches the required role for the route
    if (route.data['role'] && route.data['role'] !== userType) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}

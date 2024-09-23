import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../tokens/token.service';  // Import TokenService

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    const user = this.tokenService.getUser();  // Get user details from TokenService

    if (user && user.type === 'admin') {
      return true;  // User is authenticated and is an admin
    }

    this.router.navigate(['/login']);  // Redirect to login if not an admin
    return false;
  }
}

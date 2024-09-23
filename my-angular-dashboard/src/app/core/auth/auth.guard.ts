import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../tokens/token.service';  // Import TokenService

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.getToken()) {
      return true;  // Token exists, user is authenticated
    }
    this.router.navigate(['/login']);  // Redirect to login if no token
    return false;
  }
}


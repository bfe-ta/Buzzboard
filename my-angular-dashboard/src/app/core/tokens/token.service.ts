import { Injectable } from '@angular/core';
import { SessionStorageService } from '../storage/session-storage.service';  // Import SessionStorageService

@Injectable()
export class TokenService {
  private tokenKey: string = 'auth-token';
  private userKey: string = 'auth-user';

  constructor(private sessionStorageService: SessionStorageService) {}  // Inject SessionStorageService

  // Save the JWT token to sessionStorage
  saveToken(token: string): void {
    this.sessionStorageService.setItem(this.tokenKey, token);
  }

  // Retrieve the JWT token from sessionStorage
  getToken(): string | null {
    return this.sessionStorageService.getItem(this.tokenKey);
  }

  // Remove the JWT token from sessionStorage
  removeToken(): void {
    this.sessionStorageService.removeItem(this.tokenKey);
  }

  // Save user details in sessionStorage (optional)
  saveUser(user: any): void {
    this.sessionStorageService.setItem(this.userKey, JSON.stringify(user));
  }

  // Retrieve user details from sessionStorage (optional)
  getUser(): any {
    const user = this.sessionStorageService.getItem(this.userKey);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  // Remove user details from sessionStorage
  removeUser(): void {
    this.sessionStorageService.removeItem(this.userKey);
  }

  // Clear all sessionStorage (used during logout)
  clear(): void {
    this.sessionStorageService.clear();
  }
}


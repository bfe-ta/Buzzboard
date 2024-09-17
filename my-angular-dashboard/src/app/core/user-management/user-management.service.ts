import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../tokens/token.service';
import { AuthService } from '../auth/auth.service';
import { SessionStorageService } from '../storage/session-storage.service';  // Import SessionStorageService

import { Token } from '@angular/compiler';

@Injectable()
export class UserManagementService {
  private apiUrl = '/api/users';  // Change this based on your backend API

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private tokenService: TokenService, private sessionStorageService: SessionStorageService) {}

  // Set up headers with token
  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders().set('x-access-token', token || '');
  }

  // Login and store token and user details
  login(username: string, password: string): Observable<any> {
    return this.authService.login(username, password);
  }

  // Register a new user (admin-only functionality)
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-account`, userData, {
      headers: this.getHeaders(),
    });
  }

  // Get all active users (admin-only functionality)
  getActiveUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/active-users`, {
      headers: this.getHeaders(),
    });
  }

  // Deactivate a user (admin-only functionality)
  deactivateUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deactivate/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  // Upload file
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData, {
      headers: this.getHeaders(),
    });
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    return !!token && this.authService.isLoggedIn();
  }

  // Check if the current user is admin
  isAdmin(): boolean {
    const user = this.tokenService.getUser();
    return user && user.type === 'admin';
  }

  // Logout the user
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}


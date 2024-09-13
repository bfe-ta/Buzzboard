import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserManagementService {
  private apiUrl = '/api/users';  // Change this based on your backend API

  constructor(private http: HttpClient, private router: Router) {}

  // Set up headers with token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('x-access-token', token || '');
  }

  // Login and store token and user details
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { username, password });
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
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Check if the current user is admin
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.type === 'admin';
  }

  // Logout the user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}


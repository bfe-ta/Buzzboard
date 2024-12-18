import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth/signin ';  
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Clear token from localStorage (logout)
  logout(): void {
    localStorage.removeItem('token');
  }
}

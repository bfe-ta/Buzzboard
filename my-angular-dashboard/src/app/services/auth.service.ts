import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth/signin';  
  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Clear token from localStorage (logout)
  logout(): void {
    localStorage.removeItem('authToken');
  }
}

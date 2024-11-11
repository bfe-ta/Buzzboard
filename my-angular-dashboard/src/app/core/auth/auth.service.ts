import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators'; // Import `tap` instead of `do`
import { User } from '../user-management/user.model';
import { TokenService } from '../tokens/token.service';
import moment from 'moment'; 

@Injectable()
export class AuthService {

  private apiUrl = 'http://18.143.66.178:80/api/auth';  
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(username: string, password: string) {
    return this.http.post<User>(`${this.apiUrl}/signin`, { username, password })
      .pipe(
        tap(res => this.setSession(res)),  // Use `tap` instead of `do`
        shareReplay()  // Keep shareReplay() to prevent re-execution of HTTP calls
      );
  }
      
  private setSession(authResult: any) {
      const expiresAt = moment().add(authResult.expiresIn,'second');
      this.tokenService.saveToken(authResult.accessToken); // Save the token
      this.tokenService.saveUser({
        ...authResult,  // Spread all fields from authResult
        expiresAt       // Add the expiration time
      }); // Save expiration in user data
  }          

  logout() {
    this.tokenService.clear();
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration || "null");
      return moment(expiresAt);
  } 
}

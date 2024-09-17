import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap } from 'rxjs/operators'; // Import `tap` instead of `do`
import { User } from '../user-management/user.model';
import { TokenService } from '../tokens/token.service';
import moment from 'moment'; 

@Injectable()
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth/signin';  
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => this.setSession(res)),  // Use `tap` instead of `do`
        shareReplay()  // Keep shareReplay() to prevent re-execution of HTTP calls
      );
  }
      
  private setSession(authResult: any) {
      const expiresAt = moment().add(authResult.expiresIn,'second');
      this.tokenService.saveToken(authResult.idToken); // Save the token
      this.tokenService.saveUser({ expiresAt }); // Save expiration in user data
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

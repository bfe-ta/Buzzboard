import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  
import { CommonModule } from '@angular/common';  // For *ngIf
import { FormsModule } from '@angular/forms';    // For ngModel

@Component({
  selector: 'app-login',
  standalone: true,  // Since it's a standalone component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule]  // Import CommonModule and FormsModule
})
export class LoginComponent {
  credentials = { username: '', password: '' };  
  errorMessage = '';  

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        this.authService.storeToken(response.token);  
        console.log('Login successful!');
        localStorage.setItem('token', response.token);  
        this.router.navigate(['/dashboard']);  
      },
      error => {
        this.errorMessage = 'Invalid email or password';  
      }
    );
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    // Simulate a successful login and store a mock JWT token
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('type', 'admin');
    this.router.navigate(['/dashboard']); // Navigate to the dashboard
  }
}

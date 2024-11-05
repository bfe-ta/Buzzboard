import { Component } from '@angular/core';
import { Router } from '@angular/router';// Import your CoreModule if needed for services
import { UserManagementService } from '../../../core/user-management/user-management.service';
import { CommonModule } from '@angular/common';  // For *ngIf
import { FormsModule } from '@angular/forms';

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
    private userManagementService: UserManagementService,
    private router: Router
  ) {}

  login() {
  this.userManagementService.login(this.credentials.username, this.credentials.password).subscribe(
    (response) => {
      // Redirect based on user type
      if (response.type === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    },
    (error) => {
      console.error('Login error', error);
    }
  );
}
}
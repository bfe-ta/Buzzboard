import { Component } from '@angular/core';
import { Router } from '@angular/router';// Import your CoreModule if needed for services
import { UserManagementService } from '../../../core/user-management/user-management.service';
import { TokenService } from '../../../core/tokens/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private userManagementService: UserManagementService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login() {
    const user = {
      id: 1,                   // Replace with actual id
      username: 'john_doe',     // Replace with actual username
      company: 'Acme Corp',     // Replace with actual company
      type: 'admin',            // Assuming type is 'admin'
      isActive: true            // Replace with the actual boolean value for active status
    };
    this.tokenService.saveToken('dummy');
    this.tokenService.saveUser(user);
    // Redirect based on user type
    if (user.type === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/dashboard']);
    }
    // this.userManagementService.login(this.username, this.password).subscribe(
    //   (response) => {
    //     // Store token and user details in sessionStorage using TokenService
    //     this.tokenService.saveToken(response.accessToken);
    //     this.tokenService.saveUser(response);

    //     // Redirect based on user type
    //     if (response.type === 'admin') {
    //       this.router.navigate(['/admin']);
    //     } else {
    //       this.router.navigate(['/dashboard']);
    //     }
    //   },
    //   (error) => {
    //     console.error('Login error', error);
    //   }
    // );
  }
}

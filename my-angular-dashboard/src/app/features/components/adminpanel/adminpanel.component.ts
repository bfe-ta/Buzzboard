import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../core/tokens/token.service';
import { UserManagementService } from '../../../core/user-management/user-management.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AdminPanelComponent {
  selectedFile: File | null = null;
  users: any[] = [];
  newUser = {
    username: '',
    password: '',
    company: '',
    type: 'user',
  };

  constructor(private http: HttpClient, private userManagementService: UserManagementService) {
    this.loadActiveUsers();
  }

  // Load all active users
  loadActiveUsers() {
    this.userManagementService.getActiveUsers().subscribe(
    (response) => {
      this.users = response;
    },
    (error) => {
      console.error('Login error', error);
    }
    );
  }

  // Register new user
  registerUser() {
    this.userManagementService.registerUser(this.newUser).subscribe(
      (response) => {
        console.info(response.message);
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }

  // Deactivate a user
  deactivateUser(userId: number) {
    this.userManagementService.deactivateUser(userId).subscribe(
      (response) => {
        console.info(response.message);
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      this.selectedFile = file;  // Store the selected file
      console.log('File selected:', file.name);
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      console.error('No file selected!');
      return;
    }
    this.userManagementService.uploadFile(this.selectedFile).subscribe(
      (response) => {
        console.info(response.message);
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
}


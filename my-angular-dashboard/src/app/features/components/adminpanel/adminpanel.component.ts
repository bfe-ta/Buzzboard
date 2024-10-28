import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserManagementService } from '../../../core/user-management/user-management.service';
import { DataManagementService } from '../../../core/data/data-management.service';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class AdminPanelComponent {
  selectedFile: File | null = null;
  users: any[] = [];
  
  // Define the user registration form
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userManagementService: UserManagementService, private dataManagementService: DataManagementService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      company: ['', [Validators.required]],
      type: ['user', [Validators.required]],  // Default value
    });

    this.loadActiveUsers();
  }

  // Load all active users
  loadActiveUsers() {
    this.userManagementService.getActiveUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  // Register new user
  registerUser() {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;
      this.userManagementService.registerUser(newUser).subscribe(
        (response) => {
          console.info('User created successfully:', response.message);
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  // Deactivate a user
  deactivateUser(userId: number) {
    this.userManagementService.deactivateUser(userId).subscribe(
      (response) => {
        console.info('User deactivated:', response.message);
      },
      (error) => {
        console.error('Error deactivating user:', error);
      }
    );
  }

  // File selection event
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      this.selectedFile = file;
      console.log('File selected:', file.name);
    }
  }

  // File upload function
  uploadFile(): void {
    if (!this.selectedFile) {
      console.error('No file selected!');
      return;
    }
    this.dataManagementService.uploadFile(this.selectedFile).subscribe(
      (response) => {
        console.info('File uploaded successfully:', response.message);
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
}



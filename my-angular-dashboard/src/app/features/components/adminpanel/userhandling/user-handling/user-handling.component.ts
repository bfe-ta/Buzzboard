import { Component, OnInit } from '@angular/core'; // Core Angular imports
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Form handling
import { UserManagementService } from '../../../../../core/user-management/user-management.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Notifications
import { MatInputModule } from '@angular/material/input'; // Input fields
import { MatButtonModule } from '@angular/material/button'; // Buttons
import { MatSelectModule } from '@angular/material/select'; // Dropdown select
import { MatListModule } from '@angular/material/list'; // List for active users
import { MatIconModule } from '@angular/material/icon'; // Icons
import { MatCardModule } from '@angular/material/card'; // Card for wrapping the form and user list
import { CommonModule } from '@angular/common'; // Common Angular directives like *ngFor

@Component({
  selector: 'app-user-handling',
  templateUrl: './user-handling.component.html',
  styleUrls: ['./user-handling.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule, // For forms
    MatInputModule, // Input fields
    MatButtonModule, // Buttons
    MatSelectModule, // Dropdown select
    MatListModule, // Lists for displaying users
    MatIconModule, // Icons
    MatCardModule, // Cards
    MatSnackBarModule, // Snackbar for notifications
    CommonModule, // Common directives like *ngIf, *ngFor
  ]
})
export class UserHandlingComponent implements OnInit {
  registerForm: FormGroup;
  users: any[] = [];

  constructor(private fb: FormBuilder, private userManagementService: UserManagementService, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      company: ['', [Validators.required]],
      type: ['user', [Validators.required]] // Default value
    });
  }

  ngOnInit(): void {
    this.loadActiveUsers();
  }

  // Register a new user
  registerUser(): void {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;
      this.userManagementService.registerUser(newUser).subscribe(
        (response) => {
          this.snackBar.open('User created successfully!', 'Close', { duration: 3000 });
          this.loadActiveUsers();  // Reload users after registration
        },
        (error) => {
          this.snackBar.open('Error registering user.', 'Close', { duration: 3000 });
        }
      );
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', { duration: 3000 });
    }
  }

  // Load all active users
  loadActiveUsers(): void {
    this.userManagementService.getActiveUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  // Deactivate a user
  deactivateUser(userId: number): void {
    this.userManagementService.deactivateUser(userId).subscribe(
      (response) => {
        this.snackBar.open('User deactivated!', 'Close', { duration: 3000 });
        this.loadActiveUsers();  // Refresh the list of users after deactivation
      },
      (error) => {
        this.snackBar.open('Error deactivating user.', 'Close', { duration: 3000 });
      }
    );
  }
}


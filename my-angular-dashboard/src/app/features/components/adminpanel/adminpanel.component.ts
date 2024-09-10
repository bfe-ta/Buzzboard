import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';

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

  constructor(private http: HttpClient) {
    this.loadActiveUsers();
  }

  // Load all active users
  loadActiveUsers() {
    const token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': `Bearer ${token}`
      }),
    }

    this.http.get<any[]>('/api/admin/active-users', httpOptions).subscribe({
      next: (users) => (this.users = users),
      error: (error) => console.error('Error loading users', error),
    });
  }

  // Register new user
  registerUser() {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': `Bearer ${token}`
      }),
    }

    this.http.post('/api/admin/create-account', this.newUser, httpOptions).subscribe({
      next: () => {
        alert('User created successfully!');
        this.loadActiveUsers();  // Reload the user list
      },
      error: (error) => console.error('Error creating user', error),
    });
  }

  // Deactivate a user
  deactivateUser(userId: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': `Bearer ${token}`
      }),
    }

    this.http.post(`/api/admin/deactivate-account/${userId}`, {}, httpOptions).subscribe({
      next: () => {
        alert('User deactivated successfully!');
        this.loadActiveUsers();  // Reload the user list
      },
      error: (error) => console.error('Error deactivating user', error),
    });
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

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Replace '/api/upload' with your actual API endpoint
    this.http.post('/api/upload', formData).subscribe(
      (response) => {
        console.log('Upload successful', response);
      },
      (error) => {
        console.error('Upload failed', error);
      }
    );
  }
}


import { Component } from '@angular/core'; // Component decorator
import { DataManagementService } from '../../../../../core/data/data-management.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // For notifications
import { MatButtonModule } from '@angular/material/button'; // Angular Material button
import { MatIconModule } from '@angular/material/icon'; // Angular Material icons
import { CommonModule } from '@angular/common'; // Common directives like *ngIf

@Component({
  selector: 'app-file-handling',
  templateUrl: './file-handling.component.html',
  styleUrls: ['./file-handling.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule, // Buttons
    MatSnackBarModule, // Snack bar for notifications
    MatIconModule, // Icons
    CommonModule, // Common directives like *ngIf
  ]
})
export class FileHandlingComponent {
  selectedFile: File | null = null;

  constructor(private dataManagementService: DataManagementService, private snackBar: MatSnackBar) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFile = file;
      this.snackBar.open(`File selected: ${file.name}`, 'Close', { duration: 3000 });
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.snackBar.open('No file selected!', 'Close', { duration: 3000 });
      return;
    }
    this.dataManagementService.uploadFile(this.selectedFile).subscribe(
      (response) => {
        this.snackBar.open('File uploaded successfully!', 'Close', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Error uploading file.', 'Close', { duration: 3000 });
      }
    );
  }
}

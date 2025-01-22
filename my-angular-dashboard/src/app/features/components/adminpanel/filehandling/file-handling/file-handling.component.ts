import { Component } from '@angular/core'; // Component decorator
import { DataManagementService } from '../../../../../core/data/data-management.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // For notifications
import { MatButtonModule } from '@angular/material/button'; // Angular Material button
import { MatIconModule } from '@angular/material/icon'; // Angular Material icons
import { CommonModule } from '@angular/common'; // Common directives like *ngIf
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FormsModule } from '@angular/forms';
import { DashboardDataService } from '../../../dashboard/services/dashboard-data.service';
import { DatePipe } from '@angular/common';




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
  FormsModule,
],
providers: [DatePipe],
})
export class FileHandlingComponent {
selectedFile: File | null = null;
data: any[][] = []; // Holds the Excel data as a 2D array
headers: string[] = []; // Holds the table headers
filteredData: any[][] = []; // Holds the filtered data

constructor(
  private dataManagementService: DataManagementService, 
  private snackBar: MatSnackBar,
  private dashboardDataService: DashboardDataService, // Inject DashboardDataService
  private datePipe: DatePipe,
) {}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    this.selectedFile = file;
    this.readFile(file);
    this.snackBar.open(`File selected: ${file.name}`, 'Close', { duration: 3000 });
  }
}

readFile(file: File): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    const binaryStr = e.target?.result;
    const workbook = XLSX.read(binaryStr, { type: 'binary' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });

    if (jsonData.length) {
      this.headers = jsonData[0] as string[]; // First row as headers

      // Filter out rows where every cell is empty
      this.data = jsonData.slice(1).filter(row => 
        row.some(cell => cell !== null && cell !== undefined && cell !== '')
      ).map(row => row.map(cell => String(cell))); // Convert to string
    }
  };
  reader.readAsBinaryString(file);
}

// updateCell(event: Event, rowIndex: number, colIndex: number): void {
//   const input = event.target as HTMLInputElement;
//   this.data[rowIndex][colIndex] = input.value;
// }

sortColumn(columnIndex: number, direction: 'asc' | 'desc'): void {
  this.data.sort((a, b) => {
    const valA = a[columnIndex] || '';
    const valB = b[columnIndex] || '';

    if (valA === valB) return 0;

    return direction === 'asc' ? (valA < valB ? -1 : 1) : valA > valB ? -1 : 1;
  });

  this.snackBar.open(`Column sorted in ${direction}ending order!`, 'Close', {
    duration: 3000,
  });
}

updateChanges(): void {
  this.snackBar.open('Changes are already saved in memory!', 'Close', { duration: 3000 });
}


uploadFile(): void {
  if (!this.selectedFile) {
    this.snackBar.open('No file selected!', 'Close', { duration: 3000 });
    return;
  }

  const formattedData = this.data.map((row, index) => {
    const rowData: any = { rank: index + 1 }; // Add rank field
    this.headers.forEach((header, colIndex) => {
      rowData[header] = row[colIndex]; // Map header to cell value
    });
    return rowData;
  });

  // Call the backend API to upload data
  this.dashboardDataService.uploadData(formattedData).subscribe(
    (response) => {
      this.snackBar.open('Data uploaded successfully!', 'Close', { duration: 3000 });
    },
    (error) => {
      this.snackBar.open('Error uploading data.', 'Close', { duration: 3000 });
      console.error(error);
    }
  );
}

saveFile(): void {
  if (this.headers.length === 0 || this.data.length === 0) {
    this.snackBar.open('No data available to download!', 'Close', { duration: 3000 });
    return;
  }

  const worksheet = XLSX.utils.aoa_to_sheet([this.headers, ...this.data]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'edited-file.xlsx');
  this.snackBar.open('File downloaded successfully!', 'Close', { duration: 3000 });
}

addRow(): void {
  const newRow = Array(this.headers.length).fill(''); // Create a new row with empty values
  this.data.push(newRow); // Add the row to the data array
  this.snackBar.open('Row added successfully!', 'Close', { duration: 3000 });
}


addColumn(): void {
 // Add a new column header
 this.headers.push(`New Column ${this.headers.length + 1}`);

 // Add an empty cell for each row in the data
 this.data.forEach((row) => {
   row.push('');
 });
 this.snackBar.open('Column added successfully!', 'Close', { duration: 3000 });
}

deleteRow(rowIndex: number): void {
 this.data.splice(rowIndex, 1); // Remove the row from the data array
 this.snackBar.open('Row deleted successfully!', 'Close', { duration: 3000 });
}

deleteColumn(columnIndex: number): void {
  // Remove the column header
  this.headers.splice(columnIndex, 1);

  // Remove the corresponding column data from each row
  this.data.forEach(row => {
    row.splice(columnIndex, 1);
  });

  this.snackBar.open(`Column ${columnIndex + 1} deleted successfully!`, 'Close', {
    duration: 3000,
  });
}

}







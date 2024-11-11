import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserManagementService } from '../user-management/user-management.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
  private apiUrl = 'http://18.143.66.178:80/api';  // Change this based on your backend API

  constructor(private http: HttpClient, private userManagementService: UserManagementService) {}

  // Upload file
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData, {
      headers: this.userManagementService.getHeaders(),
    });
  }

  getData(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/board`, {
      headers: this.userManagementService.getHeaders(),
    });
  }
}

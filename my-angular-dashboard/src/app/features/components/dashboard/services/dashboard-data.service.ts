import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataService {
  private baseUrl = 'http://localhost:3000/api'; // Update with your backend base URL

  constructor(private http: HttpClient) {}
  

  private dataSubject = new BehaviorSubject<any[]>([]);
  data$: Observable<any[]> = this.dataSubject.asObservable();

  private updatedOnSubject = new BehaviorSubject<string>('');  // New BehaviorSubject for updatedOn
  updatedOn$: Observable<string> = this.updatedOnSubject.asObservable();  // Observable for updatedOn

  setData(data: any[]): void {
    this.dataSubject.next(data);
  }

  setUpdatedOn(updatedOn: string): void {
    this.updatedOnSubject.next(updatedOn);  // Emit updatedOn value
  }

  uploadData(data: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/buzzData`, { data });
  }

  getDashboardData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }

  
}


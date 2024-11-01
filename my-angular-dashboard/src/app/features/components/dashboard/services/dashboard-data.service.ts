import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
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
}



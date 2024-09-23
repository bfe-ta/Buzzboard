import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { ContentComponent } from '../../../shared/components/content/content.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';  // Import DatePipe
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ContentComponent, CommonModule],
  providers: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  data: any[] = [];
  updatedOn: string = '';
  logoUrl: string = '/assets/pwc-logo.png';  // Dynamic logo URL
  mainTitle: string = '';  // Dynamic main title
  subTitle: string = 'Private Buzzloop Leaderboard';  // Dynamic subtitle

  constructor(private datePipe: DatePipe, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage

    if (token) {
      const headers = new HttpHeaders().set('x-access-token', token);

      this.http
        .get<any[]>('/api/board', { headers })
        .subscribe(
          (response) => {
            this.data = response;
          },
          (error) => {
            console.error('Error loading data', error);
          }
        );
    } else {
      console.error('No token found');
    }
  }

  setUpdatedOn(): void {
    const now = new Date();
    // Format date using Angular's DatePipe (e.g., '28/08/2024 14:30:15')
    this.updatedOn = this.datePipe.transform(now, 'dd/MM/yyyy HH:mm:ss') || '';
  }
}

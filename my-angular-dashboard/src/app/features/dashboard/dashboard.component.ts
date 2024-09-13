import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ContentComponent } from '../../shared/content/content.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ContentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  data: any[] = [];

  constructor(private http: HttpClient) {}

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
}

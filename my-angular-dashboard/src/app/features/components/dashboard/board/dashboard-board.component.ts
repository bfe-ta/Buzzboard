import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from '../../../../shared/components/content/content.component';
import { DashboardDataService } from '../services/dashboard-data.service'; 
@Component({
  selector: 'app-dashboard-board',
  standalone: true,
  imports: [CommonModule, ContentComponent],
  templateUrl: './dashboard-board.component.html',
  styleUrls: ['./dashboard-board.component.scss'],
})
export class DashboardBoardComponent implements OnInit {
  data: any[] = [];
  updatedOn: string = '';  // Store the updatedOn value

  constructor(private dashboardDataService: DashboardDataService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardDataService.getDashboardData().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        console.error('Error fetching dashboard data', error);
      }
    );
  }
}



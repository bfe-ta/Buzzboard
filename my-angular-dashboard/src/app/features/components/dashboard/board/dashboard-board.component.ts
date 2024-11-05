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
    // Subscribe to the data emitted by DashboardDataService
    this.dashboardDataService.data$.subscribe((data) => {
      this.data = data;
    });

    // Subscribe to updatedOn emitted by DashboardDataService
    this.dashboardDataService.updatedOn$.subscribe((updatedOn) => {
      this.updatedOn = updatedOn;  // Store the updatedOn value
    });
  }
}



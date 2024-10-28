import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { ContentComponent } from '../../../shared/components/content/content.component';
import { DataManagementService } from '../../../core/data/data-management.service';
import { TokenService } from '../../../core/tokens/token.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';  // Import DatePipe
import { SidebarItem } from '../../../shared/models/sidebar-item.model';
import { RouterModule } from '@angular/router';
import { DashboardDataService } from './services/dashboard-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ContentComponent, CommonModule, RouterModule],
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

  // Inject DashboardDataService
  constructor(
    private dataManagementService: DataManagementService,
    private dashboardDataService: DashboardDataService, // Added the data service here
    private datePipe: DatePipe,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.setMainTitle();
    this.loadData();
  }

  loadData(): void {
    this.dataManagementService.getData().subscribe(
      (response) => {
        this.data = response;
        this.dashboardDataService.setData(this.data);  // Pass the data to DashboardDataService
        this.setUpdatedOn();
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  setUpdatedOn(): void {
    const now = new Date();
    // Format date using Angular's DatePipe (e.g., '28/08/2024 14:30:15')
    this.updatedOn = this.datePipe.transform(now, 'dd/MM/yyyy HH:mm:ss') || '';
    this.dashboardDataService.setUpdatedOn(this.updatedOn);
  }

  setMainTitle(): void {
    const user = this.tokenService.getUser();  // Retrieve user data from session storage

    if (user && user.company) {
      this.mainTitle = `${user.company}'s`;  // Set the main title to the company name
    } else {
      this.mainTitle = "Company's";  // Fallback in case user or company is undefined
    }
  }

  sidebarItems: SidebarItem[] = [
    {
      label: 'Board',
      icon: '/assets/chart.png',
      route: 'board'
    }
  ];
}

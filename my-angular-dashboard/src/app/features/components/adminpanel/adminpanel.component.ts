import { Component, OnInit } from '@angular/core'; // Core Angular imports
import { HeaderComponent } from '../../../shared/components/header/header.component'; // Shared header component
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component'; // Shared sidebar component
import { SidebarItem } from '../../../shared/models/sidebar-item.model'; // Sidebar item model
import { CommonModule } from '@angular/common'; // Common Angular directives
import { RouterModule } from '@angular/router'; // For router-outlet

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss'],
  imports: [
    HeaderComponent, // Import the shared header
    SidebarComponent, // Import the shared sidebar
    CommonModule, // Common directives like *ngIf
    RouterModule // For <router-outlet>
  ]
})
export class AdminPanelComponent implements OnInit {
  logoUrl: string = '/assets/buzzloop-logo.png'; // Admin panel logo URL
  mainTitle: string = 'Admin Panel'; // Title for the header
  subTitle: string = 'Manage Users and Data'; // Subtitle for the header

  // Sidebar items for the admin panel
  sidebarItems: SidebarItem[] = [
    { label: 'User Management', icon: '/assets/user.png', route: 'user-handling' },
    { label: 'File Upload', icon: '/assets/document.png', route: 'file-upload' }
  ];

  constructor() {}

  ngOnInit(): void {}
}




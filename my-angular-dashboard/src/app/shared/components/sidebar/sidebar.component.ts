import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { CommonModule } from '@angular/common';
import { SidebarItem } from '../../models/sidebar-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],  // Include RouterModule to use routerLink
})
export class SidebarComponent {
  @Input() sidebarItems: SidebarItem[] = [];
}



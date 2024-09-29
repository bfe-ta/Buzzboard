// src/app/shared/models/sidebar-item.model.ts
export interface SidebarItem {
    label: string;
    icon?: string;  // Optional icon
    route?: string;  // Route for navigation
    children?: SidebarItem[];  // For submenus
  }
  

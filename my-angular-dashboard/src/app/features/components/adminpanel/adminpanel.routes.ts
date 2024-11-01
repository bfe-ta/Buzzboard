import { Routes } from '@angular/router';
import { AdminPanelComponent } from './adminpanel.component';
import { UserHandlingComponent } from './userhandling/user-handling/user-handling.component';
import { FileHandlingComponent } from './filehandling/file-handling/file-handling.component';

export const adminRoutes: Routes = [
  {
    path: '', // Base path for 'admin'
    component: AdminPanelComponent,
    children: [
      { path: 'user-handling', component: UserHandlingComponent },
      { path: 'file-upload', component: FileHandlingComponent },
      { path: '', redirectTo: 'user-handling', pathMatch: 'full' } // Default route
    ]
  }
];


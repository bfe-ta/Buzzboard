import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardBoardComponent } from './board/dashboard-board.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'board', pathMatch: 'full' },
      { path: 'board', component: DashboardBoardComponent },
    ],
  },
];

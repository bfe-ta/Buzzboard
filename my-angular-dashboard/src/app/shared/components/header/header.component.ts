import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() logoUrl: string = '';  // Input for the logo image URL
  @Input() mainTitle: string = '';  // Input for the main title (e.g., "PWC's")
  @Input() subTitle: string = '';  // Input for the subtitle (e.g., "Private Buzzloop Leaderboard")
}


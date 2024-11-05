import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule],  // Standalone component
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() data: any[] = [];  // Dynamic data input
  @Input() template!: TemplateRef<any>;  // Template reference for dynamic content rendering

  trackByFn(index: number, item: any): number {
    return index;  // Track by index for better performance
  }
}


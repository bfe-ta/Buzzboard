import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Import your root component
import { appConfig } from './app/app.config';        // Import ApplicationConfig

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));



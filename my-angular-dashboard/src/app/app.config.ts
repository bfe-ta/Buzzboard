import { ApplicationConfig, provideZoneChangeDetection, NgModule } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes), // Initialize the routes
    // Other module imports as necessary
  ],
  exports: [RouterModule],
})
export class AppConfigModule {}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(appRoutes)]
};

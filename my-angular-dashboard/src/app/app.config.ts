import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';  // Import routes
import { provideCore } from './core/core';  // Import core services (like AuthGuard, etc.)

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),                    // Provide HTTP client globally
    provideRouter(appRoutes),               // Register routing globally using `provideRouter`
    ...provideCore({                        // Register all core services globally
      routes: appRoutes,                    // Pass routes to core (if needed)
      reloadServicePollInterval: 30 * 60 * 1000,  // Polling interval (optional)
    }),
  ],
};



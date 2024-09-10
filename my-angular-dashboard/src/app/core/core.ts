import { Provider, EnvironmentProviders, InjectionToken, ErrorHandler, inject, ENVIRONMENT_INITIALIZER } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
// import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';  // Your interceptors
// import { BackendErrorHandler } from './error-handlers/backend-error-handler';  // Error handler

export const CORE_GUARD = new InjectionToken<string>('CORE_GUARD');
export const RELOAD_SERVICE_POLL_INTERVAL = new InjectionToken<number>('RELOAD_SERVICE_POLL_INTERVAL');

// Interface for passing options to `provideCore`
export interface CoreOptions {
  routes: Routes;
  reloadServicePollInterval?: number;
}

// Update return type to include EnvironmentProviders and Provider[]
export function provideCore(options: CoreOptions): (Provider | EnvironmentProviders)[] {
  return [
    provideRouter(options.routes),  // provideRouter returns EnvironmentProviders

    // Core services and providers
    // { provide: ErrorHandler, useClass: BackendErrorHandler },      // Custom error handler
    // { provide: HTTP_INTERCEPTORS, multi: true, useClass: ApiKeyInterceptor },  // API key interceptor
    { provide: CORE_GUARD, useValue: 'CORE_GUARD' },               // Prevent multiple imports
    { provide: AuthGuard, useClass: AuthGuard },                   // AuthGuard
    { provide: AdminGuard, useClass: AdminGuard },                 // AdminGuard

    // Parametrize services with options (reloadServicePollInterval)
    {
      provide: RELOAD_SERVICE_POLL_INTERVAL,
      useValue: options.reloadServicePollInterval ?? 60 * 60 * 1000,  // Default to 1 hour
    },

    // Environment initializer for long-running processes
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        const pollInterval = inject(RELOAD_SERVICE_POLL_INTERVAL);
        
        console.log('[Core] Application started!');
        
        setInterval(() => {
          console.log('[Core] Polling with interval:', pollInterval);
          // Polling logic or token refresh here
        }, pollInterval);
      },
    },
  ];
}
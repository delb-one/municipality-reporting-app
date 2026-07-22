import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideDesignAngularKit } from 'design-angular-kit';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([loggingInterceptor, loadingInterceptor, authInterceptor, errorInterceptor]),
    ),
    provideDesignAngularKit(),
  ],
};

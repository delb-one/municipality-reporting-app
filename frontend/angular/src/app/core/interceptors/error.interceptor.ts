import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, throwError } from 'rxjs';

import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          auth.logout();

          router.navigate(['/login']);

          break;

        case 403:
          console.error('Accesso negato');

          break;

        case 404:
          console.error('Risorsa non trovata');

          break;

        case 500:
          console.error('Errore interno');

          break;
      }

      return throwError(() => error);
    }),
  );
};

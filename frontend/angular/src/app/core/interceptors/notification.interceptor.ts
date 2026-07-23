import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ItNotificationService } from 'design-angular-kit';
import { catchError, tap, throwError } from 'rxjs';

export const notificationInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(ItNotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 400:
          notification.warning(
            'Richiesta non valida',
            error.error?.message ?? 'Controlla i dati inseriti.',
          );
          break;

        case 401:
          notification.error('Accesso negato', error.error?.message ?? 'Credenziali non valide.');
          break;

        case 403:
          notification.error(
            'Operazione non consentita',
            error.error?.message ?? 'Non hai i permessi necessari.',
          );
          break;

        case 404:
          notification.warning(
            'Risorsa non trovata',
            error.error?.message ?? 'La risorsa richiesta non esiste.',
          );
          break;

        case 500:
          notification.error('Errore del server', 'Si è verificato un errore interno.');
          break;

        default:
          notification.error(
            'Errore',
            error.error?.message ?? 'Si è verificato un errore imprevisto.',
          );
      }

      return throwError(() => error);
    }),
  );
};

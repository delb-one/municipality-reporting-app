import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = performance.now();

  console.groupCollapsed(`${req.method} ${req.url}`);

  console.log('Request', req);

  return next(req).pipe(
    finalize(() => {
      const elapsed = performance.now() - started;

      console.log(`Completed in ${elapsed.toFixed(0)} ms`);

      console.groupEnd();
    }),
  );
};

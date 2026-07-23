import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { API } from '../api/api.config';

import { LoginDto } from '../../features/auth/models/login.dto';
import { LoginResponse } from '../../features/auth/models/login-response';
import { AuthStorageService } from './auth-storage.service';
import { ApiWrapperResponse } from '../models/api-wrapper.model';
import { User } from '../../features/auth/models/user.model';
import { ItNotificationService } from 'design-angular-kit';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly authStorage = inject(AuthStorageService);
  private readonly notification = inject(ItNotificationService);
  private readonly _currentUser = signal<User | null>(this.authStorage.getUser());
  readonly currentUser = this._currentUser.asReadonly();
  /**
   * Stato globale dell'autenticazione.
   */
  private readonly authenticated = signal(this.hasToken());

  /**
   * Esposto in sola lettura.
   */
  readonly isAuthenticated = this.authenticated.asReadonly();

  /**
   * Login.
   */
  login(credentials: LoginDto): Observable<ApiWrapperResponse<LoginResponse>> {
    return this.http
      .post<ApiWrapperResponse<LoginResponse>>(`${API.baseUrl}${API.auth.login}`, credentials)
      .pipe(
        tap((response) => {
          this.saveToken(response.data.token);
          this.notification.success(
            'Accesso effettuato',
            `Bentornato ${response.data.user.firstname}!`,
          );
          this.authStorage.setUser(response.data.user);
          this._currentUser.set(response.data.user);
        }),
      );
  }

  /**
   * Logout.
   */
  logout(): void {
    this.notification.info('Arrivederci!');
    this.clearSession();
  }

  /**
   * Salva il JWT.
   */
  private saveToken(token: string): void {
    this.authStorage.setToken(token);

    this.authenticated.set(true);
  }

  /**
   * Restituisce il JWT.
   */
  getToken(): string | null {
    return this.authStorage.getToken();
  }

  /**
   * Getter più leggibile.
   */
  get token(): string | null {
    return this.authStorage.getToken();
  }

  /**
   * True se è presente un token.
   */
  private hasToken(): boolean {
    return this.authStorage.getToken() !== null;
  }

  /**
   * Cancella la sessione.
   */
  private clearSession(): void {
    this.authStorage.clear();

    this.authenticated.set(false);
    this._currentUser.set(null);
  }
}

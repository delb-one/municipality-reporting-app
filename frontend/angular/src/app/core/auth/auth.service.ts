import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { API } from '../api/api.config';

import { LoginDto } from '../../features/auth/models/login.dto';
import { LoginResponse } from '../../features/auth/models/login-response';
import {TokenStorageService } from './token-storage.service';
// import { User } from '../../features/auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly tokenStorage = inject(TokenStorageService);

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
  login(credentials: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API.baseUrl}${API.auth.login}`, credentials).pipe(
      tap((response) => {
        this.saveToken(response.token);
      }),
    );
  }

  /**
   * Logout.
   */
  logout(): void {
    this.clearSession();
  }

  /**
   * Salva il JWT.
   */
  private saveToken(token: string): void {
    this.tokenStorage.saveToken(token);

    this.authenticated.set(true);
  }

  /**
   * Restituisce il JWT.
   */
  getToken(): string | null {
    return this.tokenStorage.getToken();
  }

  /**
   * Getter più leggibile.
   */
  get token(): string | null {
    return this.tokenStorage.getToken();
  }

  /**
   * True se è presente un token.
   */
  private hasToken(): boolean {
    return this.tokenStorage.getToken() !== null;
  }

  /**
   * Cancella la sessione.
   */
  private clearSession(): void {
    this.tokenStorage.clear();

    this.authenticated.set(false);
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API } from '../../core/api/api.config';
import { LoginDto } from '../../features/auth/models/login.dto';
import { LoginResponse } from '../../features/auth/models/login-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(credentials: LoginDto): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${API.baseUrl}${API.auth.login}`,
      credentials
    );

  }

  logout(): void {

    localStorage.removeItem('token');

  }

  saveToken(token: string): void {

    localStorage.setItem('token', token);

  }

  getToken(): string | null {

    return localStorage.getItem('token');

  }

  isLoggedIn(): boolean {

    return !!this.getToken();

  }

}
import { Injectable } from '@angular/core';
import { Status } from '../models/status.model';
import { ApiWrapperResponse } from '../models/api-wrapper.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { API } from '../api/api.config';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class StatusesService {
  private baseUrl = API.baseUrl;
  private endPoint = API.statuses;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Status[]> {
    return this.http.get<ApiWrapperResponse<Status[]>>(`${this.baseUrl}${this.endPoint}`).pipe(
      map((response) => response.data)
    );
  }
}

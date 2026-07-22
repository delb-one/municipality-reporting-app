import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiWrapperResponse } from '../models/api-wrapper.model';
import { Office } from '../models/office.model';
import { API } from '../api/api.config';

@Injectable({
  providedIn: 'root',
})
export class OfficesService {
  private baseUrl = API.baseUrl;
  private endPoint = API.offices;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiWrapperResponse<Office[]>> {
    return this.http.get<ApiWrapperResponse<Office[]>>(`${this.baseUrl}${this.endPoint}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { ApiWrapperResponse } from '../models/api-wrapper.model';
import { Category } from '../../features/categories/models/category.model';
import { API } from '../api/api.config';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseUrl = API.baseUrl;
  private endPoint = API.categories;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http
      .get<ApiWrapperResponse<Category[]>>(`${this.baseUrl}${this.endPoint}`)
      .pipe(map((response) => response.data));
  }
}

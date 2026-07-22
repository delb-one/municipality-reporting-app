import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environments';
import { ApiWrapperResponse } from '../models/api-wrapper.model';
import { Category } from '../../features/categories/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiWrapperResponse<Category[]>> {
    return this.http.get<ApiWrapperResponse<Category[]>>(
      `${this.api}/categories`
    );
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environments';


import { Report } from '../../features/reports/models/report.model';
import { CreateReportDto } from './models/create-report.dto';
import { UpdateReportDto } from './models/update-report.dto';
import { UpdateStatusDto } from './models/update-status.dto';
import { UpdateOfficeDto } from './models/update-office.dto';
import { ApiWrapperResponse } from '../../core/models/api-wrapper.model';
import { ReportHistory } from './models/report-history.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiWrapperResponse<Report[]>> {
    return this.http.get<ApiWrapperResponse<Report[]>>(
      `${this.api}/reports`
    );
  }

  getById(id: string): Observable<ApiWrapperResponse<Report>> {
    return this.http.get<ApiWrapperResponse<Report>>(
      `${this.api}/reports/${id}`
    );
  }

  getByPracticeCode(
    practiceCode: string
  ): Observable<ApiWrapperResponse<Report>> {
    return this.http.get<ApiWrapperResponse<Report>>(
      `${this.api}/reports/practice/${practiceCode}`
    );
  }

  getReportHistoryById(
    id: string
  ): Observable<ApiWrapperResponse<ReportHistory[]>> {
    return this.http.get<ApiWrapperResponse<ReportHistory[]>>(
      `${this.api}/reports/${id}/history`
    );
  }

  create(
    report: CreateReportDto
  ): Observable<ApiWrapperResponse<Report>> {
    return this.http.post<ApiWrapperResponse<Report>>(
      `${this.api}/reports`,
      report
    );
  }

  update(
    id: string,
    report: UpdateReportDto
  ): Observable<ApiWrapperResponse<Report>> {
    return this.http.put<ApiWrapperResponse<Report>>(
      `${this.api}/reports/${id}`,
      report
    );
  }

  updateStatus(
    id: string,
    body: UpdateStatusDto
  ): Observable<ApiWrapperResponse<Report>> {
    return this.http.patch<ApiWrapperResponse<Report>>(
      `${this.api}/reports/${id}/status`,
      body
    );
  }

  updateOffice(
    id: string,
    body: UpdateOfficeDto
  ): Observable<ApiWrapperResponse<Report>> {
    return this.http.patch<ApiWrapperResponse<Report>>(
      `${this.api}/reports/${id}/assignment`,
      body
    );
  }

  delete(id: string): Observable<ApiWrapperResponse<null>> {
    return this.http.delete<ApiWrapperResponse<null>>(
      `${this.api}/reports/${id}`
    );
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Report } from '../../features/reports/models/report.model';
import { CreateReportDto } from './models/create-report.dto';
import { UpdateReportDto } from './models/update-report.dto';
import { UpdateStatusDto } from './models/update-status.dto';
import { UpdateOfficeDto } from './models/update-office.dto';
import { ApiWrapperResponse } from '../../core/models/api-wrapper.model';
import { ReportHistory } from './models/report-history.model';
import { API } from '../../core/api/api.config';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = API.baseUrl;
  private endPoint = API.reports;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiWrapperResponse<Report[]>> {
    return this.http.get<ApiWrapperResponse<Report[]>>(`${this.baseUrl}${this.endPoint}`);
  }

  getById(id: string): Observable<ApiWrapperResponse<Report>> {
    return this.http.get<ApiWrapperResponse<Report>>(`${this.baseUrl}${this.endPoint}/${id}`);
  }

  getByPracticeCode(practiceCode: string): Observable<ApiWrapperResponse<Report>> {
    return this.http.get<ApiWrapperResponse<Report>>(
      `${this.baseUrl}${this.endPoint}/practice/${practiceCode}`,
    );
  }

  getReportHistoryById(id: string): Observable<ApiWrapperResponse<ReportHistory[]>> {
    return this.http.get<ApiWrapperResponse<ReportHistory[]>>(
      `${this.baseUrl}${this.endPoint}/${id}/history`,
    );
  }

  create(report: CreateReportDto): Observable<ApiWrapperResponse<Report>> {
    return this.http.post<ApiWrapperResponse<Report>>(`${this.baseUrl}${this.endPoint}`, report);
  }

  update(id: string, report: UpdateReportDto): Observable<ApiWrapperResponse<Report>> {
    return this.http.put<ApiWrapperResponse<Report>>(`${this.baseUrl}${this.endPoint}/${id}`, report);
  }

  updateStatus(id: string, body: UpdateStatusDto): Observable<ApiWrapperResponse<Report>> {
    return this.http.patch<ApiWrapperResponse<Report>>(
      `${this.baseUrl}${this.endPoint}/${id}/status`,
      body,
    );
  }

  updateOffice(id: string, body: UpdateOfficeDto): Observable<ApiWrapperResponse<Report>> {
    return this.http.patch<ApiWrapperResponse<Report>>(
      `${this.baseUrl}${this.endPoint}/${id}/assignment`,
      body,
    );
  }

  delete(id: string): Observable<ApiWrapperResponse<null>> {
    return this.http.delete<ApiWrapperResponse<null>>(`${this.baseUrl}${this.endPoint}/${id}`);
  }
}

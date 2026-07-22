import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { CreateReportDto } from './models/create-report.dto';
import { UpdateReportDto } from './models/update-report.dto';
import { UpdateStatusDto } from './models/update-status.dto';
import { UpdateOfficeDto } from './models/update-office.dto';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.api}/reports`);
  }

  getById(id: string) {
    return this.http.get(`${this.api}/reports/${id}`);
  }

  getByPracticeCode(practiceCode: string) {
    return this.http.get(`${this.api}/reports/practice/${practiceCode}`);
  }

  getReportHistoryById(id: string) {
    return this.http.get(`${this.api}/reports/${id}/history`);
  }

  create(report: CreateReportDto) {
    return this.http.post(`${this.api}/reports`, report);
  }

  update(id: string, report: UpdateReportDto) {
    return this.http.put(`${this.api}/reports/${id}`, report);
  }

  updateStatus(id: string, body: UpdateStatusDto) {
    return this.http.patch(`${this.api}/reports/${id}/status`, body);
  }

  updateOffice(id: string, body: UpdateOfficeDto) {
    return this.http.patch(`${this.api}/reports/${id}/assignment`, body);
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/reports/${id}`);
  }
}

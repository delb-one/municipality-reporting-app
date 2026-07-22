import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ReportService } from '../../report.service';
import { StatusesService } from '../../../../core/services/statuses.service';
import { OfficesService } from '../../../../core/services/offices.service';

@Component({
  selector: 'app-report-page',
  imports: [],
  templateUrl: './report-page.html',
  styleUrl: './report-page.css',
})
export class ReportPage {
  // categoriesService = inject(CategoriesService);
  reportsService = inject(ReportService);
  statusesService = inject(StatusesService);
  // officesService = inject(OfficesService);

  constructor() {
    // this.getAllCategories();
    this.getAllReports();
    this.getAllStatuses();
    // this.getAllOffices();
  }

  // getAllCategories() {
  //   this.categoriesService.getAll().subscribe((response) => {
  //     console.log(response.data);
  //   });
  // }

  getAllReports() {
    this.reportsService.getAll().subscribe((response) => {
      console.log(response.data);
    });
  }

  getAllStatuses() {
    this.statusesService.getAll().subscribe((response) => {
      console.log(response.data);
    });
  }

  // getAllOffices() {
  //   this.officesService.getAll().subscribe((response) => {
  //     console.log(response.data);
  //   });
  // }
}

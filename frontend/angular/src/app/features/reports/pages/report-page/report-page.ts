import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';

@Component({
  selector: 'app-report-page',
  imports: [],
  templateUrl: './report-page.html',
  styleUrl: './report-page.css',
})
export class ReportPage {
  categoriesService = inject(CategoriesService);

  constructor() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAll().subscribe((response) => {
      console.log(response.data);
    });
  }
}

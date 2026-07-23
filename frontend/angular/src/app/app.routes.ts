import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { ReportPage } from './features/reports/pages/report-page/report-page';
import { SearchReportPage } from './features/reports/pages/search-report-page/search-report-page';
import { Homepage } from './features/homepage/homepage';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'new-report', component: ReportPage },
  { path: 'search', component: SearchReportPage },
  {
    path: 'login',
    component: Login,
  },
];

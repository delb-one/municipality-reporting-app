import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { ReportPage } from './features/reports/pages/report-page/report-page';
import { SearchReportPage } from './features/reports/pages/search-report-page/search-report-page';
import { Homepage } from './features/homepage/homepage';
import { DashboardPage } from './features/dashboard/dashboard-page/dashboard-page';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'new-report', component: ReportPage },
  { path: 'search', component: SearchReportPage },
  { path: 'dashboard', component: DashboardPage, canActivate: [authGuard] },
  {
    path: 'login',
    component: Login,
  },
];

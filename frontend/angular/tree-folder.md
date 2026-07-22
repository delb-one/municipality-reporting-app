src/
│
├── app/
│
│   ├── core/
│   │
│   │   ├── api/
│   │   │     └── api.config.ts
│   │   │
│   │   ├── auth/
│   │   │     ├── auth.service.ts
│   │   │     ├── auth.guard.ts
│   │   │     └── auth.interceptor.ts
│   │   │
│   │   ├── interceptors/
│   │   │     └── error.interceptor.ts
│   │   │
│   │   ├── layout/
│   │   │     ├── header/
│   │   │     ├── footer/
│   │   │     └── navbar/
│   │   │
│   │   └── services/
│   │
│   ├── shared/
│   │
│   │   ├── components/
│   │   │     ├── loading-spinner/
│   │   │     ├── confirm-dialog/
│   │   │     ├── pagination/
│   │   │     └── empty-state/
│   │   │
│   │   ├── pipes/
│   │   │
│   │   ├── directives/
│   │   │
│   │   └── utils/
│   │
│   ├── features/
│   │
│   │   ├── auth/
│   │   │
│   │   │     ├── pages/
│   │   │     │     └── login/
│   │   │     │
│   │   │     ├── models/
│   │   │     │     ├── login.dto.ts
│   │   │     │     ├── login-response.ts
│   │   │     │     └── user.model.ts
│   │   │     │
│   │   │     └── auth.service.ts
│   │   │
│   │   ├── reports/
│   │   │
│   │   │     ├── pages/
│   │   │     │     ├── report-list/
│   │   │     │     ├── report-detail/
│   │   │     │     ├── report-create/
│   │   │     │     └── report-edit/
│   │   │     │
│   │   │     ├── components/
│   │   │     │     ├── report-card/
│   │   │     │     ├── report-form/
│   │   │     │     ├── report-table/
│   │   │     │     ├── status-badge/
│   │   │     │     └── report-history/
│   │   │     │
│   │   │     ├── models/
│   │   │     │     ├── report.model.ts
│   │   │     │     ├── create-report.dto.ts
│   │   │     │     ├── update-report.dto.ts
│   │   │     │     ├── update-status.dto.ts
│   │   │     │     └── report-history.model.ts
│   │   │     │
│   │   │     └── report.service.ts
│   │   │
│   │   ├── categories/
│   │   │
│   │   │     ├── models/
│   │   │     │     └── category.model.ts
│   │   │     │
│   │   │     └── category.service.ts
│   │   │
│   │   ├── offices/
│   │   │
│   │   │     ├── models/
│   │   │     │     └── office.model.ts
│   │   │     │
│   │   │     └── office.service.ts
│   │   │
│   │   ├── statuses/
│   │   │
│   │   │     ├── models/
│   │   │     │     └── status.model.ts
│   │   │     │
│   │   │     └── status.service.ts
│   │   │
│   │   └── dashboard/
│   │         ├── pages/
│   │         │     └── dashboard-home/
│   │         │
│   │         └── dashboard.service.ts
│   │
│   ├── app.component.ts
│   ├── app.routes.ts
│   └── app.config.ts
│
├── assets/
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
├── styles.css
└── main.ts
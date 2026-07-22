# Frontend Development Plan

## Project

**Municipality Reporting Portal**

## Tech Stack

- Angular 20+
- TypeScript
- Bootstrap Italia
- Angular Router
- HttpClient
- RxJS
- Reactive Forms
- Zod
- Angular Signals (where appropriate)

---

# Goal

Develop a responsive Angular frontend that communicates with the Node.js backend through REST APIs while following the **Bootstrap Italia Design System**.

---

# Phase 1 - Project Setup

## Objectives

- Configure Bootstrap Italia
- Configure Angular project structure
- Configure HttpClient
- Configure environment variables
- Organize feature modules

### Tasks

- Install Bootstrap Italia
- Configure global styles
- Configure Bootstrap Italia JavaScript
- Configure routing
- Configure environments
- Configure HttpClient
- Create shared models
- Configure application layout

---

# Phase 2 - Core Architecture

## Objectives

Create the application's core infrastructure.

### Features

- Authentication (already implemented)
- HTTP Interceptors
- Route Guards
- Error Handling
- Global Loading Indicator
- Global Error Handling
- Application Configuration

### Structure

```text
core/
├── auth/
├── guards/
├── interceptors/
├── layout/
├── models/
└── services/
```

---

# Phase 3 - Shared Components

## Objectives

Create reusable UI components.

### Components

- Header
- Navigation
- Footer
- Breadcrumb
- Hero
- Page Title
- Section Card
- Status Badge
- Loading Spinner
- Empty State
- Alert Message
- Confirmation Modal
- Search Bar
- Pagination
- Data Table

---

# Phase 4 - API Layer

## Objectives

Create centralized services for backend communication.

### Services

- ReportsService
- CategoriesService
- OfficesService
- StatusesService
- DashboardService

### Features

- GET
- POST
- PUT
- PATCH
- DELETE

Handle:

- Loading
- Success
- Errors

Use RxJS Observables for asynchronous data management.

---

# Phase 5 - Public Area

## Home Page

### Sections

- Hero
- Service Cards
- Quick Links
- FAQ Preview
- Contacts
- Footer

---

## New Report

### Form Fields

- First Name
- Last Name
- Email
- Phone
- Category
- Street
- Description
- Privacy Consent

### Features

- Reactive Forms
- Zod Validation
- Error Messages
- Submit
- Success Notification

---

## Report Search

### Features

Search by:

- Practice Code

Display:

- Current Status
- Report Details
- Assigned Office
- Timeline

---

# Phase 6 - Authentication Integration

> Authentication is already implemented.

## Objectives

Integrate authentication with the application.

### Features

- Login page
- Logout
- Auth Guard
- JWT Interceptor
- Protected Routes
- Role-based Authorization (future extension)

---

# Phase 7 - Operator Dashboard

Protected administration area.

### Dashboard Cards

- Total Reports
- Open Reports
- In Progress
- Closed Reports

### Widgets

- Statistics
- Charts
- Recent Reports
- Quick Actions

---

# Phase 8 - Reports Management

Create the reports management page.

### Features

- Server-side Pagination
- Search
- Filters
- Sorting

### Columns

- Practice Code
- Category
- Citizen
- Status
- Office
- Date

### Actions

- View Details
- Edit
- Change Status

---

# Phase 9 - Report Details

Display:

- Complete Report Information
- Timeline
- History
- Internal Notes

Allow:

- Change Status
- Assign Office
- Add Internal Note

---

# Phase 10 - Forms & Validation

Implement validation across the application.

Validate:

- Required Fields
- Email Format
- Phone Number
- Text Length
- Category Selection
- Privacy Checkbox

Display user-friendly validation messages.

---

# Phase 11 - UX Improvements

Improve user experience.

Implement:

- Loading Indicators
- Skeleton Loaders
- Toast Notifications
- Empty States
- Confirmation Dialogs
- Global Error Pages

---

# Phase 12 - Responsive Design

Verify every page on:

- Desktop
- Tablet
- Mobile

Use Bootstrap Italia responsive utilities.

---

# Phase 13 - Accessibility

Verify:

- Semantic HTML
- Keyboard Navigation
- Labels
- Focus Management
- ARIA Attributes
- Color Contrast

Follow Bootstrap Italia accessibility guidelines.

---

# Phase 14 - Testing

Test every feature.

Verify:

- Navigation
- Authentication
- CRUD Operations
- API Integration
- Forms
- Error Handling
- Responsive Layout

---

# Recommended Folder Structure

```text
src/
└── app/
    ├── core/
    │   ├── auth/
    │   ├── guards/
    │   ├── interceptors/
    │   ├── layout/
    │   ├── models/
    │   └── services/
    │
    ├── shared/
    │   ├── components/
    │   ├── directives/
    │   ├── pipes/
    │   ├── models/
    │   └── utils/
    │
    ├── features/
    │   ├── auth/
    │   ├── home/
    │   ├── dashboard/
    │   └── reports/
    │       ├── create/
    │       ├── search/
    │       ├── details/
    │       └── management/
    │
    ├── app.component.ts
    ├── app.config.ts
    └── app.routes.ts

environments/
```

---

# Milestones

## Milestone 1

- Angular Setup
- Bootstrap Italia Configuration
- Core Architecture
- Routing

---

## Milestone 2

- Shared Components
- API Services
- HTTP Interceptors

---

## Milestone 3

- Public Area
- Home Page

---

## Milestone 4

- New Report
- Forms & Validation

---

## Milestone 5

- Report Search

---

## Milestone 6

- Authentication Integration
- Protected Routes

---

## Milestone 7

- Operator Dashboard

---

## Milestone 8

- Reports Management

---

## Milestone 9

- Report Details

---

## Milestone 10

- UX Improvements
- Responsive Design
- Accessibility
- Final Testing

---

# Final Goal

Build a modern, responsive, and accessible Angular application that closely resembles a real Italian Public Administration web portal, fully integrated with the existing Node.js backend and PostgreSQL database while leveraging the Bootstrap Italia Design System and Angular best practices such as standalone components, lazy-loaded feature areas, route guards, HTTP interceptors, and a scalable feature-based architecture.
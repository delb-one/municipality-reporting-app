import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ReportService } from '../../report.service';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Category } from '../../../categories/models/category.model';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ItAlertComponent,
  ItBreadcrumbComponent,
  ItBreadcrumbItemComponent,
  ItButtonDirective,
  ItCardComponent,
  ItFormModule,
} from 'design-angular-kit';

@Component({
  selector: 'app-report-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ItAlertComponent,
    ItBreadcrumbComponent,
    ItBreadcrumbItemComponent,
    ItButtonDirective,
    ItCardComponent,
    ItFormModule,
  ],
  templateUrl: './report-page.html',
  styleUrl: './report-page.css',
})
export class ReportPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  private readonly categoriesService = inject(CategoriesService);
  private readonly reportsService = inject(ReportService);

  //──────────────────────────────────────────────
  // State
  //──────────────────────────────────────────────

  readonly categories = signal<Category[]>([]);
  readonly defaultStatusId = signal<number>(1);

  readonly loadError = signal<string | null>(null);
  readonly submitError = signal<string | null>(null);

  readonly submitting = signal(false);

  readonly createdPracticeCode = signal<string | null>(null);

  //──────────────────────────────────────────────
  // Form
  //──────────────────────────────────────────────

  readonly form = this.fb.nonNullable.group({
    firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],

    lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],

    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],

    phone: ['', [this.optionalPhoneValidator()]],

    street: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],

    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],

    categoryId: ['', Validators.required],

    privacyConsent: [false, Validators.requiredTrue],
  });

  private optionalPhoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value === null || value === undefined || value === '') {
        return null;
      }

      if (typeof value !== 'string') {
        return { invalidPhone: true };
      }

      if (value.length < 6 || value.length > 20) {
        return { invalidPhone: true };
      }

      return null;
    };
  }

  //──────────────────────────────────────────────
  // Lifecycle
  //──────────────────────────────────────────────

  ngOnInit(): void {
    console.log('[ReportPage] ngOnInit start', {
      defaultStatusId: this.defaultStatusId(),
    });

    forkJoin({
      categories: this.categoriesService.getAll(),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ categories }) => {
          this.categories.set(categories);
        },

        error: (err) => {
          this.loadError.set('Impossibile caricare i dati necessari. Riprova più tardi.');
        },
      });
  }

  //──────────────────────────────────────────────
  // Submit
  //──────────────────────────────────────────────

  submit(): void {
    const statusId = this.defaultStatusId();

    if (this.form.invalid) {
      const invalidControls = Object.entries(this.form.controls)
        .filter(([, control]) => control.invalid)
        .map(([name, control]) => ({
          name,
          errors: control.errors,
          value: control.value,
        }));

      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      return;
    }

    if (statusId === null) {
      this.submitError.set('Stato predefinito non valido.');
      return;
    }

    this.submitting.set(true);
    this.submitError.set(null);

    const value = this.form.getRawValue();

    this.reportsService
      .create({
        firstname: value.firstname,
        lastname: value.lastname,
        email: value.email,
        phone: value.phone,
        street: value.street,
        description: value.description,
        categoryId: Number(value.categoryId),
        privacyConsent: true,
        statusId,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (report) => {
          this.createdPracticeCode.set(report.data.practiceCode);

          this.form.reset({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            street: '',
            description: '',
            categoryId: '',
            privacyConsent: false,
          });
        },

        error: (err) => {
          this.submitError.set(
            err?.message ?? "Si è verificato un errore durante l'invio della segnalazione.",
          );
        },

        complete: () => {
          this.submitting.set(false);
        },
      });
  }

  //──────────────────────────────────────────────
  // Helpers
  //──────────────────────────────────────────────

  get f() {
    return this.form.controls;
  }

  newReport(): void {
    this.createdPracticeCode.set(null);
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  auth = inject(AuthService);
  loading = inject(LoadingService);
  error = '';

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = '';

    this.auth.login(this.form.getRawValue()).subscribe({
      next: (response) => {
        console.log(response);

        this.router.navigate(['/']);
      },

      error: (err) => {
        console.error(err);

        this.error = 'Email o password non validi';
      },
    });
  }

  logout(): void {
    this.auth.logout();

    this.router.navigate(['/']);
  }
}

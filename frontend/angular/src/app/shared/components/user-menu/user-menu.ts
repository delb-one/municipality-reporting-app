import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { ItIconComponent } from 'design-angular-kit';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  imports: [ItIconComponent, RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  auth = inject(AuthService);
  router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}

import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { ItIconComponent } from "design-angular-kit";

@Component({
  selector: 'app-user-menu',
  imports: [ItIconComponent],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}

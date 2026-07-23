import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { ItIconComponent } from "design-angular-kit";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-menu',
  imports: [ItIconComponent, RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}

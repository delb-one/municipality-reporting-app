import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ItHeaderComponent,
  ItIconComponent,
  ItNavBarItemComponent,
  ItButtonDirective,
} from 'design-angular-kit';
import { AuthService } from '../../core/auth/auth.service';
import { UserMenu } from '../components/user-menu/user-menu';

@Component({
  selector: 'app-header',
  imports: [
    ItHeaderComponent,
    ItIconComponent,
    ItNavBarItemComponent,
    RouterLink,
    ItButtonDirective,
    RouterLinkActive,
    FormsModule,
    UserMenu,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  auth = inject(AuthService);

  light = false;
  sticky = true;
  search = false;
  login: 'none' | 'default' | 'full' = 'default';

  logout() {
    this.auth.logout();
  }
}

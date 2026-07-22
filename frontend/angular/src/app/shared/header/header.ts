import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ItHeaderComponent,
  ItIconComponent,
  ItNavBarItemComponent,
  ItCheckboxComponent,
  ItRadioButtonComponent,
  ItButtonDirective,
} from 'design-angular-kit';

@Component({
  selector: 'app-header',
  imports: [
    ItHeaderComponent,
    ItIconComponent,
    ItNavBarItemComponent,
    RouterLink,
    ItButtonDirective,
    RouterLinkActive,
    ItCheckboxComponent,
    ItRadioButtonComponent,
    FormsModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  light = false;
  sticky = true;
  search = false;
  login: 'none' | 'default' | 'full' = 'default';
}

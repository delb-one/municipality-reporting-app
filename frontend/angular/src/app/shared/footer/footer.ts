import { Component } from '@angular/core';
import { ItFooterComponent, ItIconComponent, ItListComponent, ItListItemComponent } from "design-angular-kit";

@Component({
  selector: 'app-footer',
  imports: [ItFooterComponent, ItIconComponent, ItListComponent, ItListItemComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

   small = false;

  shadow = false;

  dark = false;
}

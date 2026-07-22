import { Component } from '@angular/core';
import { ItIconComponent, ItCardComponent, ItButtonDirective } from "design-angular-kit";

@Component({
  selector: 'app-services',
  imports: [ItIconComponent, ItCardComponent,ItButtonDirective],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {}

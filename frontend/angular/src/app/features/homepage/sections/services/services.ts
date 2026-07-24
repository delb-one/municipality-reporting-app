import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItIconComponent, ItCardComponent, ItButtonDirective } from "design-angular-kit";

@Component({
  selector: 'app-services',
  imports: [ItIconComponent, ItCardComponent,ItButtonDirective, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {}

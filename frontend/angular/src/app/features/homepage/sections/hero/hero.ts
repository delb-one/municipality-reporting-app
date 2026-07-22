import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItButtonDirective, ItIconComponent } from "design-angular-kit";

@Component({
  selector: 'app-hero',
  imports: [RouterLink, ItIconComponent,ItButtonDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}

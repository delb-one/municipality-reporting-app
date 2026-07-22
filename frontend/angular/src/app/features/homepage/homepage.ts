import { Component } from '@angular/core';
import { Hero } from './sections/hero/hero';

@Component({
  selector: 'app-homepage',
  imports: [Hero],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {}

import { Component } from '@angular/core';
import { Hero } from './sections/hero/hero';
import { KpiStrip } from "./sections/kpi-strip/kpi-strip";
import { Services } from "./sections/services/services";
import { HowItWorks } from "./sections/how-it-works/how-it-works";
import { Faq } from "./sections/faq/faq";
import { Contacts } from "./sections/contacts/contacts";

@Component({
  selector: 'app-homepage',
  imports: [Hero, KpiStrip, Services, HowItWorks, Faq, Contacts],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {}

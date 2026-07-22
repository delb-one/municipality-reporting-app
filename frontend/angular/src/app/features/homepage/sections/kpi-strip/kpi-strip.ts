import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-kpi-strip',
  imports: [CommonModule],
  templateUrl: './kpi-strip.html',
  styleUrl: './kpi-strip.css',
})
export class KpiStrip {
  stats = [
    {
      value: '6',
      label: 'Categorie di segnalazione',
    },
    {
      value: '5',
      label: 'Uffici competenti',
    },
    {
      value: '6',
      label: 'Fasi di lavorazione',
    },
    {
      value: '2026',
      label: 'Servizio attivo dal',
    },
  ];
}

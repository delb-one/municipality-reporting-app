import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItAccordionComponent } from "design-angular-kit";

export interface FaqItem {
  title: string;
  content: string;
}
@Component({
  selector: 'app-faq',
  imports: [ItAccordionComponent,CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})

export class Faq {

  faqItems: FaqItem[] = [
  {
    title: 'Come invio una segnalazione?',
    content:
      'Compila il modulo "Nuova Segnalazione", inserisci i tuoi dati e descrivi il problema. Al termine riceverai un codice pratica univoco.'
  },
  {
    title: 'Come posso controllare lo stato della pratica?',
    content:
      'Accedi alla sezione "Consulta Segnalazione" e inserisci il codice pratica ricevuto al momento dell\'invio.'
  },
  {
    title: 'Quanto tempo richiede la gestione della segnalazione?',
    content:
      'I tempi dipendono dalla tipologia della problematica e dall\'ufficio competente. Ogni aggiornamento sarà visibile nella consultazione della pratica.'
  },
  {
    title: 'Posso inviare una segnalazione anonima?',
    content:
      'No. Per garantire la tracciabilità della pratica è necessario fornire i propri dati di contatto.'
  }
];
}

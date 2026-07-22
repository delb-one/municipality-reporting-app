import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItTimelineComponent } from 'design-angular-kit';

@Component({
  selector: 'app-how-it-works',
  imports: [CommonModule, ItTimelineComponent],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
})
export class HowItWorks {
  steps = [
    {
      number: '1',
      title: 'Invia la segnalazione',
      description: 'Compila il modulo indicando categoria, indirizzo e descrizione del problema.',
    },

    {
      number: '2',
      title: 'Ricevi il codice pratica',
      description: 'Il sistema genera automaticamente un codice univoco per seguire la pratica.',
    },

    {
      number: '3',
      title: 'Presa in carico',
      description: 'La segnalazione viene assegnata all’ufficio comunale competente.',
    },

    {
      number: '4',
      title: 'Monitora gli aggiornamenti',
      description: 'Consulta lo stato della pratica e visualizza tutte le modifiche effettuate.',
    },

    {
      number: '5',
      title: 'Problema risolto',
      description: 'Al termine dei lavori la pratica viene chiusa e rimane consultabile.',
    },
  ];
}

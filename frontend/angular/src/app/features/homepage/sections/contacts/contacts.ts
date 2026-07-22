import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItButtonDirective, ItCardComponent, ItIconComponent } from "design-angular-kit";
import { IconName } from 'design-angular-kit';

interface ContactInfo {
  icon: IconName;
  title: string;
  value: string;
  link: string;
}


@Component({
  selector: 'app-contacts',
  imports: [ItCardComponent, ItIconComponent, CommonModule,RouterLink,ItButtonDirective],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {

  contacts: ContactInfo[] = [
  {
    icon: 'mail',
    title: 'Email',
    value: 'segnalazioni@comune.esempio.it',
    link: 'mailto:segnalazioni@comune.esempio.it'
  },
  {
    icon: 'telephone',
    title: 'Telefono',
    value: '+39 040 123456 (Lun - Ven 09:00 - 17:00)',
    link: 'tel:+39040123456'
  },
  {
    icon: 'map-marker',
    title: 'Sede',
    value: 'Piazza del Municipio, 1 - 34100 Trieste',
    link: '#'
  }
];
}

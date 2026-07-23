import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from "./shared/footer/footer";
import { ItNotificationsComponent } from "design-angular-kit";

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet, Header, Footer, ItNotificationsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}

import { Component, signal } from '@angular/core';
import { AppHeader } from './shared/components/app-header/app-header';
import { RouterOutlet } from '@angular/router';
import { AppFooter } from './shared/components/app-footer/app-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeader, AppFooter],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('personal_financer_analyzer');
}

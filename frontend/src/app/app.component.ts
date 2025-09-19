import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav style="padding:12px;border-bottom:1px solid #eee">
      <a routerLink="/" style="margin-right:12px">Home</a>
      <a routerLink="/contacts" style="margin-right:12px">Contacts</a>
      <a routerLink="/contacts/new">Add Contact</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
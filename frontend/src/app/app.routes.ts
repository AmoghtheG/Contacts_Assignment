import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', loadComponent: () => import('./pages/contact-list/contact-list.component').then(m => m.ContactListComponent) },
  { path: 'contacts/new', loadComponent: () => import('./pages/contact-form/contact-form.component').then(m => m.ContactFormComponent) },
  { path: 'contacts/:id/edit', loadComponent: () => import('./pages/contact-form/contact-form.component').then(m => m.ContactFormComponent) },
  { path: '**', redirectTo: 'contacts' }
];
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';

import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, DatePipe,
    MatTableModule, MatSortModule, MatPaginatorModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  rows: any[] = [];
  total = 0;
  cols = ['name', 'email', 'phone', 'createdAt', 'actions'];

  search = '';
  sort: 'name' | 'email' | 'createdAt' = 'createdAt';
  order: 'asc' | 'desc' = 'desc';
  page = 1;
  limit = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sorter!: MatSort;

  constructor(private api: ContactsService, private sb: MatSnackBar) {}

  ngOnInit() { this.load(); }

  load() {
    this.api.list({ search: this.search, sort: this.sort, order: this.order, page: this.page, limit: this.limit })
      .subscribe({
        next: ({ data, total }) => { this.rows = data; this.total = total; },
        error: err => this.sb.open(err?.error?.message || 'Load failed', 'OK', { duration: 2000 })
      });
  }

  onSearch(e: Event) {
    this.search = (e.target as HTMLInputElement).value;
    this.page = 1;
    this.load();
  }

  onSort(s: Sort) {
    if (!s.active) return;
    this.sort = s.active as any;
    this.order = (s.direction || 'asc') as any;
    this.load();
  }

  onPage(pe: PageEvent) {
    this.page = pe.pageIndex + 1;
    this.limit = pe.pageSize;
    this.load();
  }

  confirmDelete(c: any) {
    if (!confirm(`Delete ${c.name}?`)) return;
    this.api.delete(c.id).subscribe({
      next: () => { this.sb.open('Deleted', 'OK', { duration: 1500 }); this.load(); },
      error: err => this.sb.open(err?.error?.message || 'Delete failed', 'OK', { duration: 2000 })
    });
  }
}
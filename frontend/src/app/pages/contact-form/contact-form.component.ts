import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ContactsService,
    private sb: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-()\s]+$/)]],
      address: ['']
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : undefined;
    this.isEdit = !!this.id;

    if (this.isEdit) this.api.get(this.id!).subscribe(c => this.form.patchValue(c));
  }

  save() {
    const data = this.form.value;
    const op = this.isEdit ? this.api.update(this.id!, data) : this.api.create(data);
    op.subscribe({
      next: () => { this.sb.open('Saved', 'OK', { duration: 1500 }); this.router.navigate(['/contacts']); },
      error: err => this.sb.open(err?.error?.message || 'Save failed', 'OK', { duration: 2000 })
    });
  }
}
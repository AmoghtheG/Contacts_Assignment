import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private base = `${environment.apiBaseUrl}/contacts`;

  constructor(private http: HttpClient) {}

  list(opts: { search?: string; sort?: string; order?: 'asc'|'desc'; page?: number; limit?: number } = {}): Observable<any> {
    let params = new HttpParams();
    Object.entries(opts).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params = params.set(k, String(v));
    });
    return this.http.get<any>(this.base, { params });
  }

  get(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.base}/${id}`);
  }

  create(c: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.base, c);
  }

  update(id: number, c: Partial<Contact>): Observable<Contact> {
    return this.http.put<Contact>(`${this.base}/${id}`, c);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
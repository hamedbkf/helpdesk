import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
    private http = inject(HttpClient);
    private url = 'http://localhost:8080/api/tickets';

    getTickets(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(this.url);
    }
    
    getTicketById(id: number): Observable<Ticket> {
        return this.http.get<Ticket>(`${this.url}/${id}`);
    }

    createTicket(request: Ticket): Observable<void> {
        return this.http.post<void>(this.url, request);
    }

    updateTicket(id: number, request: Ticket): Observable<void> {
        return this.http.put<void>(`${this.url}/${id}`, request);
    }

    deleteTicket(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);

    }

    getSortedTickets(sortBy: string, sortDir: 'asc' | 'desc'): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(`${this.url}/sort`, {
            params: { sortBy, sortDir }
        });
    }
}


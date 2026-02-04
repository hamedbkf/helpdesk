import { Component, signal, inject, computed } from '@angular/core';

import { TicketFilter } from './ticket-filter/ticket-filter';

import { TicketViewCards } from './ticket-view/ticket-view-cards/ticket-view-cards';
import { TicketViewTable } from './ticket-view/ticket-view-table/ticket-view-table';

import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';


import { OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-list',
  imports: [TicketFilter, TicketViewCards, TicketViewTable],
  template: `

  <app-ticket-filter
      (textChanged)="onFilterText($event)"
      (priorityChanged)="onFilterPriority($event)"
      (statusChanged)="onFilterStatus($event)"
      (sortChanged)="onSortChange($event)"
  ></app-ticket-filter>

  <hr>

  @if ( viewMode() === 'cards' ) {
      <app-ticket-view-cards [tickets]="filteredTickets()"></app-ticket-view-cards>
  }
  @else {
      <app-ticket-view-table [tickets]="filteredTickets()"></app-ticket-view-table>
  }

  `,
  styles: `
  hr {
      margin-bottom: 30px;
      margin-top: 0;}
  `,
})
export class TicketList implements OnInit {

    viewMode = signal<'cards' | 'table'>('cards');

    ticketService = inject(TicketService);

    tickets = signal<Ticket[]>([]);




    filterText     = signal('');
    filterPriority = signal('');
    filterStatus   = signal('');
    sortField      = signal('id');
    sortDirection  = signal<'asc' | 'desc'>('asc');

    filteredTickets = computed(() => {
        let result = [...this.tickets()];

        const text = this.filterText().toLowerCase().trim();
        if (text) {
            result = result.filter(t =>
                                       t.title.toLowerCase().includes(text) ||
                                       t.description.toLowerCase().includes(text) ||
                                       t.user.toLowerCase().includes(text)
                                  );
        }

        const prio = this.filterPriority();
        if (prio) {
            result = result.filter(t => t.priority === prio);
        }

        const stat = this.filterStatus();
        if (stat) {
            result = result.filter(t => t.status === stat);
        }

        const [field, dir] = [this.sortField(), this.sortDirection()];
        result.sort((a, b) => {
            let valA = (a as any)[field];
            let valB = (b as any)[field];

            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();

            if (valA < valB) return dir === 'asc' ? -1 : 1;
            if (valA > valB) return dir === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    });




    ngOnInit() {
        this.ticketService.getTickets().subscribe({
            next: data => { this.tickets.set(data); console.log(this.tickets()) },
            error: err => console.error('Failed to load tickets', err)
        });
    }


    onFilterText(text: string) {
        this.filterText.set(text);
    }

    onFilterPriority(prio: string) {
        this.filterPriority.set(prio);
    }

    onFilterStatus(stat: string) {
        this.filterStatus.set(stat);
    }

    onSortChange(value: string) {
        const [field, direction] = value.split(',') as [string, 'asc' | 'desc'];
        this.sortField.set(field);
        this.sortDirection.set(direction);
    }
}

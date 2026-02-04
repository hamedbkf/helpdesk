import { Component, input, inject } from '@angular/core';
import { NgStyle } from '@angular/common';

import { Ticket } from '../../../../models/ticket';

import { RouterLink } from '@angular/router';


import { TicketService } from '../../../../services/ticket.service';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-view-cards',
  imports: [RouterLink, DatePipe],
  template: `

  <div id="card_list">

  @for ( ticket of tickets(); track ticket.id) {
    <div id="ticket_card">
        <div id="ticket_header"><h3>#{{ ticket.id }}</h3> <h4>{{ ticket.user }}</h4>
        <button id="edit_button" [routerLink]="['/tickets', ticket.id]"><img src="icons/edit.png"></button>
        <button id="delete_button" (click)="deleteTicket(ticket.id!)"><img src="icons/delete.png"></button>
        </div>
        <h3 id="title">{{ ticket.title }}</h3>
        <p id="description">{{ ticket.description }}</p>

        <h4>status: {{ ticket.status }}</h4>
        <p id="last_updated">Last Updated: {{ ticket.lastUpdateDate | date:'short' }} </p>
        <div id="ticket_priority"
             [style]="{
                 'background-color': ticket.priority === 'LOW'      ? 'limegreen' :
                                     ticket.priority === 'MEDIUM'   ? 'gold'      :
                                     ticket.priority === 'CRITICAL' ? 'tomato'    : ''
             }">
            PRIORITY: {{ ticket.priority }}
        </div>
    </div>
  }

  </div>

  `,

  styles: `
    #card_list {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
    }

    #ticket_card {
        border: medium solid black;
        width: 300px;
        height: 300px;
        display: flex;
        flex-direction: column;

    }

    #ticket_card * {
        margin: 5px;
    }

    #edit_button, #delete_button {
        padding: 3px !important;
        height: 40px;
        width: 40px;
    }
    #edit_button img, #delete_button img {
        margin: 0;
        height: 100%;
        width: 100%;
    }

    #description {
        flex: 8;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #ticket_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0 !important;

    }

    #ticket_header h3 {
        flex:2;
    }

    #title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex:3;
        margin-top: 0 !important;
    }

    #last_updated {
        font-size: 16px;
    }


    #ticket_priority {
        margin: 0 !important;
        margin-top: auto;
        height: 40px;
        background-color: limegreen; /* limegreen gold tomato */
        border-top: medium solid black;
        font-weight: bold;
        text-align: center;

        display: flex;
        align-items: center;
        justify-content: center;
    }

  `,
})
export class TicketViewCards {
    
    readonly tickets = input<Ticket[]>();

    ticketService = inject(TicketService);
    private router = inject(Router);



    deleteTicket(id: number) {
      if (confirm(`Delete ticket #${id}?\n\nThis cannot be undone.`)) {
        this.ticketService.deleteTicket(id).subscribe({
          next: () => {
            window.location.reload();

          },
          error: (err) => {
            alert("Delete failed. Try again.");
            console.error(err);
          }
        });
      }
    }
}

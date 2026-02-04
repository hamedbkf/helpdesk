import { Component, input } from '@angular/core';

import { Ticket } from '../../../../models/ticket';

@Component({
  selector: 'app-ticket-view-table',
  imports: [],
  template: `
    <p>
      ticket-view-table works!
    </p>
  `,
  styles: ``,
})
export class TicketViewTable {

    readonly tickets = input<Ticket[]>();
}

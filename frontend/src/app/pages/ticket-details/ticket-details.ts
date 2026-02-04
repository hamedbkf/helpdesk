import { Component, signal, inject } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';

import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-details',
  imports: [FormsModule, ReactiveFormsModule],
  template: `
  @if ( ticket() ) {
    <section>
      <form [formGroup]="ticketForm" (ngSubmit)="onSubmit()">
        <fieldset>
          <legend>Modify Ticket</legend>
          <div class="row">
            <div class="column">
              <label for="title">Title</label>
              <input type="text" name="title" id="title" [value]="ticket()?.title ?? ''"
                     formControlName="title" required>
            </div>

            <div class="column">
              <label for="description">Description</label>
              <textarea name="description" id="description" [value]="ticket()?.description ?? ''"
                        formControlName="description" required></textarea>
            </div>

          </div>
          <label for="status">Status</label>
          <select name="status" id="status"
                  formControlName="status" required>
            <option value="NEW">New</option>
            <option value="PENDING">Pending</option>
            <option value="SOLVED">Solved</option>
          </select>
          
          <label for="priority">Priority</label>
          <select name="priority" id="priority"
                  formControlName="priority" required>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="CRITICAL">Critical</option>
          </select>
          <button type="submit" [disabled]="ticketForm.invalid">Modify</button>
        </fieldset>
      </form>
    </section>
  } @else {
      <p style="color:red;">Ticket not Found</p>
  }
  `,
  styles: `
  #description {
      height: 200px;
  }
  `,
})
export class TicketDetails {
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);

    ticketForm: FormGroup = this.formBuilder.group({
        title:       ['', [Validators.required, Validators.minLength(15)]],
        description: ['', [Validators.required, Validators.minLength(30)]],
        status:      ['', Validators.required],
        priority:    ['', Validators.required]

    });

    errorMessage = '';

    onSubmit() {
        if (this.ticketForm.invalid) return;

        const updatedTicket = this.ticketForm.value;

        this.ticketService.updateTicket(this.ticket()!.id!, updatedTicket).subscribe({
            next: () => {
                alert('Ticket updated successfully!');
                this.router.navigate(['/tickets']);
            },
            error: () => {
                this.errorMessage = 'Failed to edit Ticket. Try again';
            }
        });
    }


    private ticketService = inject(TicketService); 
    private route = inject(ActivatedRoute);

    id = 0;
    ticket = signal<Ticket | null>(null);


    constructor() {
        this.id = Number( this.route.snapshot.paramMap.get('id') );

        this.ticketService.getTicketById(this.id).subscribe({
            next: data => { this.ticket.set(data);
                            this.ticketForm.patchValue({
                                title:       data.title,
                                description: data.description,
                                status  :    data.status,
                                priority:    data.priority
                            });
                          },
            error: err => console.error('Failed to load ticket', err)
        });
    }


}

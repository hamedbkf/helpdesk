import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-create',
  imports: [ReactiveFormsModule, FormsModule],
  template: `
    <section>
      <form [formGroup]="ticketForm" (ngSubmit)="onSubmit()">
        <fieldset>
          <legend>Create a Ticket</legend>
          <div class="row">
            <div class="column">
              <label for="title">Title</label>
              @if (ticketForm.get('title')?.hasError('required') && ticketForm.get('title')?.touched) {
                <small style="color:red">Title is required</small>
              }
              <input type="text" id="title" formControlName="title">
            </div>
            <div class="column">
              <label for="description">Description</label>
              @if (ticketForm.get('description')?.hasError('required') && ticketForm.get('description')?.touched) {
                <small style="color:red">Description is required</small>
              }
              <textarea id="description" formControlName="description"></textarea>
            </div>
          </div>
          <label for="priority">Priority</label>
          <select id="priority" formControlName="priority">
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="CRITICAL">Critical</option>
          </select>
          <button type="submit" [disabled]="ticketForm.invalid">Create</button>
        </fieldset>
      </form>
      @if (errorMessage) {
        <p style="color:red">{{ errorMessage }}</p>
      }
    </section>
  `,
  styles: ``,
})
export class TicketCreate {
  private fb = inject(FormBuilder);
  private ticketService = inject(TicketService);
  private router = inject(Router);

  ticketForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['LOW', Validators.required]
  });

  errorMessage = '';

  onSubmit() {
    if (this.ticketForm.invalid) return;

    const formData = this.ticketForm.value;

    this.ticketService.createTicket(formData).subscribe({
      next: () => {
        this.router.navigate(['/tickets']);
      },
      error: () => {
        this.errorMessage = 'Failed to create ticket';
      }
    });
  }
}

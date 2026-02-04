import { Component, signal, output } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ticket-filter',
  imports: [],
  template: `
  <section id="search_bar">
      <button id="search_button" (click)="focusSearchInput()"><img src="icons/search.png"></button>
      <input type="text" placeholder="Filter by title, description or user..." (input)="onTextChange($event)" #searchInput >

      <button id="filter_button" (click)="toggleFilterSelects()"><img src="icons/filter.png"></button>
  </section>
      @if ( showFilterSelects() ) {

      <div id="filter_selects_div">
          <div>
          <label for="priority">Priority</label>
          <select name="priority" (change)="onPriorityChange($event)">
              <option value="">All</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="CRITICAL">Critical</option>
          </select>
          </div>

          <div>
          <label for="status">Status</label>
          <select name="status" (change)="onStatusChange($event)">
              <option value="">All</option>
              <option value="NEW">New</option>
              <option value="PENDING">Pending</option>
              <option value="SOLVED">Solved</option>
          </select>
          </div>

          <div>
          <label for="orderby">Order By</label>
          <select name="order by" (change)="onSortChange($event)">
              <option value="update,desc">Last Updated ↓</option>
              <option value="create,desc">Last Created ↓</option>
              <option value="title,desc">Title Z-A</option>
              <option value="title,asc">Title A-Z</option>
              <option value="id,desc">ID ↓</option>
              <option value="id,asc">ID ↑</option>
          </select>
          </div>
      </div>

      }
  `,
  styles:`

    #search_bar {
        display: flex; gap: 5px;
    }
    #search_bar input {
        flex: 10;
    }
    #search_bar button {
        padding: 0px 10px; height: 36px;
    }

    #search_button {
        padding: 3px !important;
        
    }

    #search_button img {
        height: 100%;
        width:  100%;
    }

    
    #filter_button {
        padding: 3px !important;
    }

    #filter_button img {
        height: 100%;
        width:  100%;

    }

    #filter_selects_div {
        display: flex;
        justify-content: space-evenly;

        margin-top: -10px;
    }
  `,
})
export class TicketFilter {

    showFilterSelects = signal<boolean>(false);

    toggleFilterSelects() {
        this.showFilterSelects.update(current => !current);
    }


    // filtering with outputs and emit events

    textChanged    = output<string>();
    priorityChanged = output<string>();
    statusChanged   = output<string>();
    sortChanged     = output<string>();

    onTextChange(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.textChanged.emit(value);
    }

    onPriorityChange(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.priorityChanged.emit(value);
    }

    onStatusChange(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.statusChanged.emit(value);
    }

    onSortChange(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.sortChanged.emit(value);
    }




    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
    focusSearchInput() {
        if (this.searchInput) {
            const input = this.searchInput.nativeElement;
            input.focus();
            input.value = '';
            this.textChanged.emit('');
        }
    }
}

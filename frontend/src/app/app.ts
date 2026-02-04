import { Component, signal } from '@angular/core';

import { Header } from './layout/header/header';
import { Main } from './layout/main/main';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Main, Footer],
  template: `

  <header>
    <app-header></app-header>
  </header>


  <main>
    <app-main></app-main>
  </main>


  <footer>
    <app-footer></app-footer>
  </footer>

  `,
  styles: `

    :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    header {
        border-bottom: medium solid black;
        margin-bottom: 20px;
    }
    app-header {
        display: block;
        margin: 20px auto;
        width: 90%;

    }

    main {
        width: 90%;
        margin: 0 auto;
        flex: 1;
    }

    @media (min-width: 768px) {
        main {
            width: 70%;
        }
        app-header {
            width: 90%;
        }
    }

    @media (min-width: 1024px) {
        main {
            width: 50%;
        }
        app-header {
            width: 60%;
        }
    }

    footer {
      margin: 20px;
    }
    
  `,
})
export class App {
  protected readonly title = signal('Helpdesk');
}

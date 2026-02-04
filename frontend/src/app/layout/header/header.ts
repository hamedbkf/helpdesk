import { Component } from '@angular/core';
import { signal, inject } from '@angular/core';

import { RouterLink, RouterLinkActive} from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
  <nav>
    <ul>
      <li id="logo"><img src="favicon.png">Helpdesk</li>
      @if ( auth.isLoggedIn() ) {
          <li id="tickets">   <a routerLink="/tickets" routerLinkActive="active">    Tickets</a></li>
          <li id="create">    <a routerLink="/new-ticket" routerLinkActive="active"> New Ticket</a></li>
          <li id="dashboard"> <a routerLink="/dashboard" routerLinkActive="active">  Dashboard</a></li>
      }
          <li id="seperator" ></li>
      @if ( auth.isLoggedIn() ) {
          <li id="profile">   <a routerLink="/profile" routerLinkActive="active">    {{ auth.username() || 'Profile' }}</a></li>
          <li id="logout">    <a (click)="auth.logout()" routerLinkActive="active">  Log Out</a></li>
      } @else {
          <li id="login">    <a routerLink="/login" routerLinkActive="active">    Log In</a></li>
          <li id="register"> <a routerLink="/register" routerLinkActive="active"> Register</a></li>
      }
    </ul>
  </nav>
  `,
  styles: `

  nav {
      margin: 0;
  }
  
  ul {
      display: flex;
      align-items: center;
  }

  ul li {
      margin: 0px 5px;
  }

  #logo {
      margin-right: 50px;
      font-size: 30px;
      font-weight: bold;

      display: flex;
      align-items: center;
  }

  #logo img {
      height: 40px;
      width:  40px;
  }

  #seperator {
      flex: 2;
  }

  a.active {
      font-weight: bold;
      text-decoration-thickness: .1rem !important;
      text-decoration: underline;
  }
  `,
})
export class Header {
    auth = inject(AuthService);
}

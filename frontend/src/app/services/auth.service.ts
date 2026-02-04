import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    isLoggedIn = signal(!!localStorage.getItem('token'));

    private auth_url = 'http://localhost:8080/api/auth';


    username = signal<string>('');

    constructor(private http:HttpClient, private router:Router) {
        this.loadUsernameFromToken();
    }

    login(username:string, password:string) {
        return this.http.post<{ token: string }>( `${this.auth_url}/login`, {username, password} ).pipe(
            tap( response => {
                localStorage.setItem('token', response.token);
                this.isLoggedIn.set(true);
                this.username.set(username);
                this.router.navigate(['/tickets']);
            } )
        );
    }

    register(username:string, password:string, email:string, role:string) {
        return this.http.post( `${this.auth_url}/register`, {username, password, email, role} ).pipe(
            tap( () => this.router.navigate(['/login']))
        );
    }

    private loadUsernameFromToken() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const user = payload.sub || payload.username || '';  // common JWT fields
                this.username.set(user);
            } catch (e) {
                console.warn('Invalid token format');
            }
        }
    }

    logout() {
        localStorage.removeItem('token');
        this.isLoggedIn.set(false);
        this.router.navigate(['/login']);
    }

    getToken() {
        return localStorage.getItem('token');
    }
  
}

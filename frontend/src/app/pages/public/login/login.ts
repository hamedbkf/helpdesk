import { Component, inject } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <section>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <fieldset>
          <legend>Login</legend>

          <div class="row">

            <div class="column">
              <label for="username">Username</label>
              <input type="text" id="username"
                     formControlName="username" required>
              @if (loginForm.get('username')?.hasError('required') && loginForm.get('username')?.touched) {
                <small style="color:red;">Username is required</small>
              }
              @if (loginForm.get('username')?.hasError('minlength') && loginForm.get('username')?.touched) {
                <small style="color:red;">Username must be at least 4 characters</small>
              }
            </div>

            <div class="column">
              <label for="password">Password</label>
              <input type="password" id="password"
                     formControlName="password" required>
              @if (loginForm.get('password')?.hasError('required')
                && loginForm.get('password')?.touched) {
                    <small style="color:red;">Password is required</small>
                }
            </div>

          </div>
          <button type="submit" [disabled]="loginForm.invalid">Log In</button>

          @if (errorMessage) {
              <p style="color:red;">{{ errorMessage }}</p>
          }

        </fieldset>
      </form>
    </section>
  `,
  styles: ``,
})
export class Login {
    private formBuilder = inject(FormBuilder);
    private authService = inject(AuthService);

    loginForm: FormGroup = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    errorMessage = '';

    onSubmit() {
        if (this.loginForm.invalid) return;

        const { username, password } = this.loginForm.value;

        this.authService.login(username, password).subscribe({
            next: () => {
                this.errorMessage = '';
            },
            error: () => {
                this.errorMessage = 'Login failed - wrong username or password';
                this.loginForm.reset();
            }
        });
    }

}

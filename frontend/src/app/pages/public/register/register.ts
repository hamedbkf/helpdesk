import { Component, inject } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <section>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <fieldset>
          <legend>Register</legend>

          <div class="row">

            <div class="column">
              <label for="username">Username</label>
              <input type="text" id="username"
                     formControlName="username" required>
              @if (registerForm.get('username')?.hasError('required') && registerForm.get('username')?.touched) {
                <small style="color:red;">Username is required</small>
              }
              @if (registerForm.get('username')?.hasError('minlength') && registerForm.get('username')?.touched) {
                <small style="color:red;">Username must be at least 4 characters</small>
              }
            </div>
            <div class="column">
              <label for="email">Email</label>
              <input type="email" id="email"
                     formControlName="email" required>
              @if (registerForm.get('email')?.hasError('required') && registerForm.get('email')?.touched) {
                <small style="color:red;">Email is required</small>
              }
              @if (registerForm.get('email')?.hasError('email') && registerForm.get('email')?.touched) {
                <small style="color:red;">Please enter a valid email</small>
              }
            </div>
            <div class="column">
              <label for="password">Password</label>
              <input type="password" id="password"
                     formControlName="password" required>
              @if (registerForm.get('password')?.hasError('required') && registerForm.get('password')?.touched) {
                <small style="color:red;">Password is required</small>
              }
              @if (registerForm.get('password')?.hasError('minlength') && registerForm.get('password')?.touched) {
                <small style="color:red;">Password must be at least 6 characters</small>
              }
            </div>

            <div class="column">
            <fieldset>
                <legend>Role</legend>
                  <input type="radio" name="role" id="user_role" value="USER" formControlName="role">
                  <label for="user_role">User</label>
                  <input type="radio" name="role" id="support_role" value="SUPPORT" formControlName="role">
                  <label for="support_role">Support</label>
                @if (registerForm.get('role')?.hasError('required') && registerForm.get('role')?.touched) {
                  <small style="color:red;">Please select a role</small>
                }
            </fieldset>
            </div>

          </div>
          <button type="submit" [disabled]="registerForm.invalid">Sign Up</button>

          @if (errorMessage) {
              <p style="color:red;">{{ errorMessage }}</p>
          }

        </fieldset>
      </form>
    </section>
  `,
  styles: `
    fieldset label { display: inline-flex; margin-right: 40px; }
    fieldset input[type="radio"] { margin-right: 5px; cursor: pointer;}
  `,
})
export class Register {
    private formBuilder = inject(FormBuilder);
    private authService = inject(AuthService);

    registerForm: FormGroup = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(4)]],
        email   : ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role    : ['', Validators.required]
    });

    errorMessage = '';

    onSubmit() {
        if (this.registerForm.invalid) return;

        const { username, password, email, role } = this.registerForm.value;

        this.authService.register(username, password, email, role).subscribe({
            next: () => {
                this.errorMessage = '';
            },
            error: () => {
                this.errorMessage = 'Registration failed. Try again';
            }
        });
    }

}

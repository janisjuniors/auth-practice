import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_ROUTE_HOME } from '../../../config/app-routes';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public firstName = new FormControl('Auth', [Validators.required, Validators.minLength(2)]);
  public lastName = new FormControl('Practitioner', [Validators.required, Validators.minLength(2)]);
  public email = new FormControl('practitioner@gmail.com', [Validators.required, Validators.email]);
  public password = new FormControl('123123123123123', [Validators.required, Validators.minLength(12)]);

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly snackBar: MatSnackBar
  ) {}

  public getFirstNameErrorMessage(): string {
    if (this.firstName.hasError('minlength')) {
      return 'First name is too short';
    }

    return 'You must enter a value';
  }

  public getLastNameErrorMessage(): string {
    if (this.lastName.hasError('minlength')) {
      return 'Last name is too short';
    }

    return 'You must enter a value';
  }

  public getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('minlength') ? 'Password need to be at least 12 characters long' : '';
  }

  public register(): void {
    const { firstName, lastName, email, password } = this;

    firstName.markAsTouched();
    lastName.markAsTouched();
    email.markAsTouched();
    password.markAsTouched();

    if (!(firstName.valid && lastName.valid && email.valid && password.valid)) {
      return;
    }

    this.auth.register({
      firstName: firstName.value!,
      lastName: lastName.value!,
      email: email.value!,
      password: password.value!
    }).subscribe({
      next: () => {
        this.router.navigate([APP_ROUTE_HOME])
      },
      error: () => {
        this.snackBar.open('Something went wrong!', 'Close', {
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
      }
    });
  }
}

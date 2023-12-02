import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public email = new FormControl('practitioner@gmail.com', [Validators.required, Validators.email]);
  public password = new FormControl('123123123123123', [Validators.required, Validators.minLength(12)]);

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly snackBar: MatSnackBar
  ) {
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

  public login(): void {
    const { email, password } = this;

    email.markAsTouched();
    password.markAsTouched();

    if (!email.valid || !password.valid) {
      return;
    }

    this.snackBar.open('Something went wrong!', 'Close', {
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }
}

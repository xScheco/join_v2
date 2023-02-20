import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { DialogForgetPasswordComponent } from './dialog-forget-password/dialog-forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  signIn() {
    const { email, password } = this.loginForm.value;
    this.authService
      .signIn(email, password)
      .then(() => {
        this.router.navigate(['summary']);
      })
      .catch((err) => this.errors(err.message));
  }

  errors(error: string) {
    switch (true) {
      case error === 'Firebase: Error (auth/user-not-found).':
        this.openSnakbar('User does not exist', true);
        break;
      case error == 'Firebase: Error (auth/invalid-email).':
        this.openSnakbar('Email and password do not match', true);
        break;
      case error == 'Firebase: Error (auth/internal-error).':
        this.openSnakbar(
          'Please fill in the email correctly and the password',
          true
        );
        break;
      case error ==
        'Firebase: Password should be at least 6 characters (auth/weak-password).':
        this.openSnakbar('Password must have at least 6 characters', true);
        break;
      default:
        break;
    }
  }

  openSnakbar(message: string, error: boolean) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {
        message: message,
        error: error,
      },
    });
  }

  anonymSignIn() {
    this.authService.anonymSignIn().then(() => {
      this.authService.anonymUpdateDispalyName();
      this.router.navigate(['summary']);
    });
  }

  openDialogForgetPassword() {
    this.dialog.open(DialogForgetPasswordComponent);
  }
}

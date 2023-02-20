import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { newContact } from 'src/app/models/newContact';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  loginForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    public router: Router,
    private authService: AuthService,
    private firestore: FirestoreService,
    private color: ColorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  signUp() {
    const { firstname, lastname, email, password } = this.loginForm.value;
    this.authService
      .signUp(email, password)
      .then(() => {
        this.authService.updateUsers(firstname);
        this.createUser(firstname, lastname, email);
        this.router.navigate(['summary']);
      })
      .catch((err) => {
        this.errors(err.message);
      });
  }

  createUser(firstname: string, lastname: string, email: string) {
    this.firestore.create('users', {
      firstname: firstname,
      lastname: lastname,
      email: email.toLowerCase(),
      color: this.color.randomColor(),
    });
  }

  errors(error: string) {
    switch (true) {
      case error == 'Firebase: Error (auth/invalid-email).':
        this.openSnakbar('Fill out the form completely', true);
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
}

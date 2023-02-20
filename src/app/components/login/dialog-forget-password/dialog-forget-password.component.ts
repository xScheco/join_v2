import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';

@Component({
  selector: 'app-dialog-forget-password',
  templateUrl: './dialog-forget-password.component.html',
  styleUrls: ['./dialog-forget-password.component.scss'],
})
export class DialogForgetPasswordComponent implements OnInit {
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogForgetPasswordComponent>
  ) {}

  ngOnInit(): void {}

  forgetPassword() {
    const { email } = this.emailForm.value;
    this.auth
      .forgetPassword(email)
      .then(() => {
        this.openSnackbar('An Email has been sent to you', false);
      })
      .catch((error) => {
        if (error.message == 'Firebase: Error (auth/user-not-found).') {
          this.openSnackbar('Sorry, the email address does not exist.', true);
        }
      });
  }

  openSnackbar(message: string, error: boolean) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {
        message: message,
        error: error,
      },
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { newContact } from 'src/app/models/newContact';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';

import { FirestoreService } from 'src/app/services/firestore.service';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';

@Component({
  selector: 'app-dialog-add-contact',
  templateUrl: './dialog-add-contact.component.html',
  styleUrls: ['./dialog-add-contact.component.scss'],
})
export class DialogAddContactComponent implements OnInit {
  newContact = new newContact();
  password: string;
  createLogin: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogAddContactComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { user: any },
    private firestore: FirestoreService,
    private authService: AuthService,
    private color: ColorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userColor();
  }

  userColor() {
    this.newContact.color = this.color.randomColor();
  }

  createUser() {
    if (this.createLogin) {
      this.authService.signUp(this.newContact.email, this.password).then(() => {
        this.authService.updateUsers(this.newContact.firstname);
      });
    }
    this.firestore.create('users', this.newContact.toJSON()).then(() => {
      this.closeDialog();
      this.openSnackbar();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openSnackbar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {
        message: 'Contact succesfully created ',
        error: false,
      },
    });
  }
}

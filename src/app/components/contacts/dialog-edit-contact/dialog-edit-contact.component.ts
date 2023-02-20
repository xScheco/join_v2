import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirestoreService } from 'src/app/services/firestore.service';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';

@Component({
  selector: 'app-dialog-edit-contact',
  templateUrl: './dialog-edit-contact.component.html',
  styleUrls: ['./dialog-edit-contact.component.scss'],
})
export class DialogEditContactComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogEditContactComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { user: any },
    private firestore: FirestoreService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  updateUser() {
    this.data.user.firstname =
      this.data.user.firstname.charAt(0).toUpperCase() +
      this.data.user.firstname.slice(1);
    this.firestore
      .update('users', this.data.user.id, this.data.user)
      .then(() => {
        this.dialogRef.close();
        this.openSnackbar();
      });
  }

  openSnackbar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {
        message: 'Contact has been successfully saved',
        error: false,
      },
    });
  }
}

import { Component, Inject, inject, OnInit } from '@angular/core';

import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {
  snackBarRef = inject(MatSnackBarRef);

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string; error: boolean }
  ) {}

  ngOnInit(): void {}

  close() {
    this.snackBarRef.dismissWithAction();
  }
}

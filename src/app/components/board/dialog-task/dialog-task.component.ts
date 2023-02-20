import { Component, Inject, OnInit } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { FirestoreService } from 'src/app/services/firestore.service';
import { BoardComponent } from '../board.component';

import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss'],
})
export class DialogTaskComponent implements OnInit {
  task: any = [];
  descriptionLength: number;
  checkedRead: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string; color: any; category: any },
    private firestore: FirestoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTaskData();
  }

  getTaskData() {
    this.firestore.get('tasks', this.data.id).subscribe((task) => {
      this.task = task;
    });
  }
  changeCheckedSubtask(i: number) {
    if (!this.task.subtasks[i].checked) {
      this.task.subtasks[i].checked = true;
      this.task.subtaskTrue++;
    } else {
      this.task.subtasks[i].checked = false;
      this.task.subtaskTrue--;
    }
    this.firestore.update('tasks', this.data.id, this.task);
  }

  deleteTask() {
    this.task = [];
    this.dialogRef.close();
    setTimeout(() => {
      this.firestore.delete('tasks', this.data.id);
    }, 200);
  }

  openDialogEditTask() {
    this.dialogRef.close(DialogTaskComponent);
    this.dialog.open(DialogEditTaskComponent, {
      panelClass: 'dialogMobile',
      data: {
        task: this.task,
        id: this.data.id,
      },
    });
  }
}

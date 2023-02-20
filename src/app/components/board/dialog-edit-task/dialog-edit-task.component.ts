import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tasks } from 'src/app/models/tasks';
import { ColorService } from 'src/app/services/color.service';
import { DefaultDataService } from 'src/app/services/default-data.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { newCategory } from 'src/app/models/newCategory';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss'],
})
export class DialogEditTaskComponent implements OnInit {
  defaultCategorys: any = [];
  prio: any = [];
  user: any = [];
  task = new Tasks();
  newSubtask: boolean = false;
  category = new newCategory();
  categoryColors: any;
  error: boolean = false;
  subtaskError: boolean = false;
  inputSubtask: string;
  selectedUser: any;
  date: any;
  constructor(
    public dialogRef: MatDialogRef<DialogEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { task: any; id: string },
    private firestore: FirestoreService,
    public defaultData: DefaultDataService,
    public color: ColorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.prio = this.defaultData.prio();
    this.task = this.data.task;

    this.categoryColors = this.color.categoryColors();
    this.firestore.getAll('users').subscribe((user) => {
      this.user = user;
    });
    this.firestore.getAll('category').subscribe((category) => {
      this.defaultCategorys = category;
    });
  }

  compareUser(user1: any, user2: any) {
    return user1 && user2 && user1.id === user2.id;
  }

  changePrio(prioName: string) {
    return prioName === this.task.prio
      ? (this.task.prio = '')
      : (this.task.prio = prioName);
  }

  saveSubtask() {
    this.subtaskError =
      this.inputSubtask == undefined || this.inputSubtask == '';
    if (!this.subtaskError) {
      let i = Object.keys(this.task.subtasks).length;
      this.task.subtasks[i] = { name: this.inputSubtask, checked: false };
      this.inputSubtask = '';
    }
  }
  changeCheckedSubtask(i: number) {
    if (!this.task.subtasks[i].checked) {
      this.task.subtasks[i].checked = true;
      this.task.subtaskTrue++;
    } else {
      this.task.subtasks[i].checked = false;
      this.task.subtaskTrue--;
    }
  }

  deleteSubtask(i: number) {
    if (this.task.subtasks[i].checked) {
      this.task.subtaskTrue--;
    }
    this.task.subtasks.splice(i, 1);
  }

  saveEditTask() {
    this.task.date = new Date(this.task.date).getTime();
    this.task.category =
      this.category.name && this.category.color
        ? this.category.toJSON()
        : this.task.category;
    this.firestore.update('tasks', this.data.id, this.task).then(() => {
      this.dialogRef.close();
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        data: {
          message: 'Task was saved successfully',
          error: false,
        },
      });
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { newCategory } from 'src/app/models/newCategory';

import { Tasks } from 'src/app/models/tasks';
import { ColorService } from 'src/app/services/color.service';
import { DefaultDataService } from 'src/app/services/default-data.service';

import { FirestoreService } from 'src/app/services/firestore.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  tasks = new Tasks();
  newCategory = new newCategory();
  date: string;
  users: any = [];
  prio: any = [];
  error: boolean = true;
  prioError: boolean = false;
  newSubtask: boolean = true;
  inputSubtask: string;
  categorys: any = [];
  selectNewCategory: boolean = true;
  categoryColors: any;

  constructor(
    private firestore: FirestoreService,
    public color: ColorService,
    private defaultData: DefaultDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.categoryColors = this.color.categoryColors();
    this.prio = this.defaultData.prio();
    this.firestore.getAll('category').subscribe((category) => {
      this.categorys = category;
    });
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }

  getUsers() {
    this.firestore.getAll('users').subscribe((users) => {
      this.users = users;
    });
  }
  changePrio(prioName: string) {
    if (prioName === this.tasks.prio) {
      this.tasks.prio = '';
    } else {
      this.tasks.prio = prioName;
    }
  }
  saveCategory() {
    if (this.newCategory.color === '') {
      this.error = false;
    } else {
      this.firestore.create('category', this.newCategory.toJSON());
      this.selectNewCategory = true;
      this.newCategory = new newCategory();
    }
  }
  deleteCategory(id: string) {
    this.firestore.delete('category', id);
  }
  saveSubtask() {
    let i = Object.keys(this.tasks.subtasks).length;
    this.tasks.subtasks[i] = { name: this.inputSubtask, checked: false };
    this.inputSubtask = '';
  }
  deleteSubtask(i: number) {
    this.tasks.subtasks.splice(i, 1);
    this.inputSubtask = '';
  }

  checkNewCategoryEmpty() {
    return this.newCategory.name && this.newCategory.color
      ? this.firestore.create('category', this.newCategory.toJSON())
      : undefined;
  }

  checkTaskCategory() {
    return (this.tasks.category =
      this.newCategory.name && this.newCategory.color
        ? this.newCategory.toJSON()
        : this.tasks.category);
  }

  SaveTask() {
    this.checkNewCategoryEmpty();
    this.checkTaskCategory();
    this.tasks.date = new Date(this.date).getTime();
    this.tasks.descriptionLength = this.tasks.description.length;
    this.firestore.create('tasks', this.tasks.toJSON()).then(() => {
      this.clearForm();
      this.selectNewCategory = true;
      this.openSnakbar();
    });
  }

  clearForm() {
    this.formDirective.resetForm();
    this.tasks.prio = '';
    this.tasks.subtasks = [];
  }

  openSnakbar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {
        message: 'Task added to board',
        error: false,
      },
    });
  }
}

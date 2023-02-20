import { DialogRef } from '@angular/cdk/dialog';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ColorService } from 'src/app/services/color.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DialogTaskComponent } from './dialog-task/dialog-task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  columns = [
    { name: 'todo', data: [] as any },
    {
      name: 'progress',
      data: [] as any,
    },
    {
      name: 'feedback',
      data: [] as any,
    },
    {
      name: 'done',
      data: [] as any,
    },
  ];
  deleteChecked: boolean = false;
  searchText: string;
  taskid: any;
  tasks: any = [];
  constructor(
    private firestore: FirestoreService,
    private dialog: MatDialog,
    public colors: ColorService
  ) {}

  ngOnInit(): void {
    this.firestore.getAll('tasks').subscribe((data) => {
      this.clearColumnsData();
      this.filterTasks(data);
    });
  }

  clearColumnsData() {
    this.columns.find((colum) => colum.name === 'todo').data = [];
    this.columns.find((colum) => colum.name === 'progress').data = [];
    this.columns.find((colum) => colum.name === 'feedback').data = [];
    this.columns.find((colum) => colum.name === 'done').data = [];
  }

  filterTasks(tasks: any) {
    this.columns
      .find((colum) => colum.name === 'todo')
      .data.push(tasks.filter((task: any) => task['colum'] == 'todo'));
    this.columns
      .find((colum) => colum.name === 'progress')
      .data.push(tasks.filter((task: any) => task['colum'] == 'progress'));
    this.columns
      .find((colum) => colum.name === 'feedback')
      .data.push(tasks.filter((task: any) => task['colum'] == 'feedback'));
    this.columns
      .find((colum) => colum.name === 'done')
      .data.push(tasks.filter((task: any) => task['colum'] == 'done'));
  }

  drop(event: CdkDragDrop<string[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.updateData(this.taskid, event.container.id);
      this.clearColoumnsDataArray();
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  clearColoumnsDataArray() {
    this.columns.find((colum) => colum.name === 'todo').data = [];
    this.columns.find((colum) => colum.name === 'progress').data = [];
    this.columns.find((colum) => colum.name === 'feedback').data = [];
    this.columns.find((colum) => colum.name === 'done').data = [];
  }

  updateData(id: string, data: any) {
    this.firestore.update('tasks', id, { colum: [data] });
  }

  deleteTask(id: string) {
    this.columns = [
      { name: 'todo', data: [] as any },
      {
        name: 'progress',
        data: [] as any,
      },
      {
        name: 'feedback',
        data: [] as any,
      },
      {
        name: 'done',
        data: [] as any,
      },
    ];
    this.firestore.delete('tasks', id);
  }

  openDialogTask(id: string, category: any, color: string) {
    this.dialog.open(DialogTaskComponent, {
      data: {
        id: id,
        color: color,
        category: category,
      },
    });
  }
}

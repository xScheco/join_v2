import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  greetingMessage: string;
  userName: string = '';
  tasks: any = [];
  progress: number;
  feedback: number;
  todo: number;
  done: number;
  urgentLength: number = 0;
  upcoming: any = [];
  currentDate = new Date();

  constructor(public auth: Auth, private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.greetingTime();
    this.userName = this.auth.currentUser.displayName;
    this.getTaks();
  }

  greetingTime() {
    const hour = new Date().getHours();
    switch (true) {
      case hour < 6:
        this.greetingMessage = 'Good Morning';
        break;
      case hour >= 6 && hour < 12:
        this.greetingMessage = 'Good Morning';
        break;
      case hour >= 12 && hour < 18:
        this.greetingMessage = 'Nice Afternoon';
        break;
      case hour >= 18:
        this.greetingMessage = 'Good evening';
        break;
    }
  }

  getTaks() {
    this.firestoreService.getAll('tasks').subscribe((tasks) => {
      this.tasks = tasks;
      this.urgentLength = tasks.filter(
        (prio) => prio['prio'] == 'Urgent'
      ).length;
      this.upcoming = tasks.sort((a: any, b: any) => a.date - b.date)[0];
      this.progress = tasks.filter((cat) => cat['colum'] == 'progress').length;
      this.feedback = tasks.filter((cat) => cat['colum'] == 'feedback').length;
      this.todo = tasks.filter((cat) => cat['colum'] == 'todo').length;
      this.done = tasks.filter((cat) => cat['colum'] == 'done').length;
    });
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  join: boolean = false;
  summary: boolean = false;
  board: boolean = false;
  task: boolean = false;
  contact: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}

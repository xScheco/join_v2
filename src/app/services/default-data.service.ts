import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DefaultDataService {
  constructor() {}

  category() {
    return [
      { name: 'Design', color: '#ff7a00' },
      { name: 'Marketing', color: '#0038ff' },
      { name: 'Media', color: '#ffc701' },
    ];
  }

  prio() {
    return [
      { name: 'Urgent', icon: 'keyboard_double_arrow_up' },
      { name: 'Middle', icon: 'drag_handle' },
      { name: 'Low', icon: 'keyboard_double_arrow_down' },
    ];
  }
}

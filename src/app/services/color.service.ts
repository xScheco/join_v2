import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor() {}

  randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  categoryColors() {
    return [
      {
        name: 'lightblue',
        color: '#8aa4ff',
      },
      {
        name: 'red',
        color: '#ff0000',
      },
      {
        name: 'green',
        color: '#2fd400',
      },
      {
        name: 'turquoise',
        color: '#1fd7c1',
      },
      {
        name: 'pink',
        color: '#e200c0',
      },
      {
        name: 'purple',
        color: '#cb87ff',
      },
    ];
  }
}

import { Component, HostListener } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
  side: boolean;
  title = 'Join';
  constructor(public auth: Auth) {}

  ngOnInit(): void {
    this.checkWindowWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  screenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  checkWindowWidth() {
    this.screenWidth().subscribe((width) => {
      if (width < 1050) {
        this.side = false;
      } else {
        this.side = true;
      }
    });
  }
}

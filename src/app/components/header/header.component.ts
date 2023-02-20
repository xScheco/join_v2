import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  url: string;
  constructor(
    public auth: Auth,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {}
  logout() {
    if (this.auth.currentUser.isAnonymous) {
      this.authService.deleteUsers();
    }
    this.authService.logout().then(() => {
      this.router.navigate(['login']);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-bs-nav',
  templateUrl: './bs-nav.component.html',
  styleUrls: ['./bs-nav.component.css']
})
export class BsNavComponent {

  appUser: AppUser;
  constructor(private afAuthService: AuthService) {
    afAuthService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
  this.afAuthService.logout();
  }

 }

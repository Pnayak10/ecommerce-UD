import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent {

  constructor(private afAuthService: AuthService) {
  }

  login() {
    this.afAuthService.login();
  }
}

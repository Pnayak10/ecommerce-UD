import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
     return  this.auth.appUser$
      .map(appUser => appUser.isAdmin);

  }
}

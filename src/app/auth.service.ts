import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }


  login() {
    this.afAuth.authState.subscribe(x => console.log(x.displayName));
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }

  logout() {
    this.afAuth.auth.signOut();
  }

}

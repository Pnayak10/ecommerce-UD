import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent implements OnInit {
  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;
  @Input() userInfo: any;

  constructor(private afAuthService: AuthService, private privateafProductServide: ProductsService) {
  }

  login() {
    this.afAuthService.login();
  }

  ngOnInit() {
    this.windowRef = this.afAuthService.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {
                this.windowRef.confirmationResult = result;
                console.log(result);
            })
            .catch( error => console.log(error) );
  }
  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {
                    this.user = result.user;
                    console.log(this.user);
                    this.userInfo = this.user.providerData[0].phoneNumber;
                    console.log(this.userInfo);
                    this.privateafProductServide.savePhoneDetails(this.userInfo);
    })
    .catch( error => console.log(error, 'Incorrect code entered?'));
  }
}
export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;
  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}

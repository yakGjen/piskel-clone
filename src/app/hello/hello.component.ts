import {Component, EventEmitter, Output} from '@angular/core';
import {LoginEventService} from '../shared/login-event.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent {

  constructor(private loginDataEvent: LoginEventService) {}

  loginForm = '';
  loginPassword = '';

  checkLogin() {
    this.loginDataEvent.loginData.emit(null);
  }

  sendData() {
    // console.log(this.loginForm, this.loginPassword);
    this.loginDataEvent.loginData.emit({
      login: this.loginForm,
      password: this.loginPassword
    });
  }

}

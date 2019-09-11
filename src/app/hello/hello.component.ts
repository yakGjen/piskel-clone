import {Component} from '@angular/core';
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
    this.loginDataEvent.loginData.emit({
      login: this.loginForm,
      password: this.loginPassword
    });
  }

}

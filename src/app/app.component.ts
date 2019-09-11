import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthServiceService} from './shared/auth/auth-service.service';
import {LoginEventService} from './shared/login-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private login: AuthServiceService,
    private loginDataEvent: LoginEventService
  ) {}

  statusLogin = false;
  statusLoginText = 'Log In';

  loginData = '';
  passwordData = '';

  ngOnInit() {
    this.loginDataEvent.loginData.subscribe((data) => {
      if (data === null) {
        console.log('ok');
        this.checkLogin();
      } else {
        this.loginData = data.login;
        this.passwordData = data.password;
      }
    });
  }

  checkLogin() {
    if (this.statusLogin) {

      this.login.logOut();

      this.statusLogin = false;
      this.statusLoginText = 'Log In';
      this.router.navigate(['/'], {relativeTo: this.route});

    } else {
      if (this.loginData === '' && this.passwordData === '') {
        this.login.logIn();

        this.statusLogin = true;
        this.statusLoginText = 'Log Out';
        this.router.navigate(['/main'], {relativeTo: this.route});
      }
      /*this.login.logIn();

      this.statusLogin = true;
      this.statusLoginText = 'Log Out';
      this.router.navigate(['/main'], {relativeTo: this.route});*/
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  loggedIn = false;

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  isAuth() {
    return new Promise((res, rej) => {
      // setTimeout(() => res(this.loggedIn), 0);
      res(this.loggedIn);
    });
  }
}

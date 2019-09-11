import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  saveUser(login, password, layers) {
    console.log('user was saved');
    localStorage.removeItem(login);
    localStorage.setItem(login, JSON.stringify({
      password,
      layers
    }));
  }

  getUser(login, password) {
    if (login in localStorage) {
      console.log('localstorage has a user');
      const data = JSON.parse(login);
      if (password === data.password) {
        return data.layers;
      }
    }
  }
}

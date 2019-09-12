import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  saveUser(login, password, size, layers) {
    localStorage.setItem(login, JSON.stringify({
      password,
      size,
      layers
    }));
  }

  getUser(login, password) {
    if (login in localStorage) {
      const data = JSON.parse(localStorage.getItem(login));
      if (password === data.password) {
        return data;
      }
    }
  }
}

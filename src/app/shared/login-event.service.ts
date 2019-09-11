import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginEventService {
  loginData: EventEmitter<any> = new EventEmitter();
}

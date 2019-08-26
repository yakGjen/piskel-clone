import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedrawEventService {
  redrawEvent: EventEmitter<any> = new EventEmitter();
}

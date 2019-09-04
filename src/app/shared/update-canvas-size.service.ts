import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateCanvasSizeService {
  updateCanvasSize: EventEmitter<any> = new EventEmitter();
}

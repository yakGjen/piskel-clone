import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UpdateCanvasSizeService} from '../shared/update-canvas-size.service';
import {LoginEventService} from '../shared/login-event.service';
import {StorageService} from '../shared/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(
    private updateCanvasSizeEvent: UpdateCanvasSizeService,
    private loginDataEvent: LoginEventService,
    private storageService: StorageService
  ) {}

  @ViewChild('canvas') canvas;
  layers = [];
  selectedLayer = [];

  widthCell = 0;
  heightCell = 0;

  toolInfo;
  selectedColor;

  xSize = 32;
  ySize = 32;

  loginData = '';
  passwordData = '';

  ngOnInit() {
    this.loginDataEvent.loginData.subscribe((data) => {
      if (data !== null) {
        this.loginData = data.login;
        this.passwordData = data.password;
      }
    });

    const savedObj = this.storageService.getUser(this.loginData, this.passwordData);

    if (savedObj) {
      this.layers = savedObj.layers;
      this.xSize = savedObj.size;
      this.ySize = savedObj.size;
    }

    this.widthCell = this.canvas.canvas.nativeElement.offsetWidth / this.xSize;
    this.heightCell = this.canvas.canvas.nativeElement.offsetHeight / this.ySize;

    window.onunload = () => {
      this.storageService.saveUser(this.loginData, this.passwordData, this.xSize, this.layers);
    };
  }

  ngOnDestroy() {
    window.onunload = null;
    this.storageService.saveUser(this.loginData, this.passwordData, this.xSize, this.layers);
  }

  addLayer() {
    const layer = [];
    for (let i = 0; i < this.ySize; i++) {
      for (let j = 0; j < this.xSize; j++) {
        layer.push({
          x: j * this.widthCell,
          y: i * this.heightCell,
          color: 'transparent',
        });
      }
    }
    this.layers.push(layer);
  }

  deleteLayer(numb) {
    this.layers.splice(numb, 1);
  }

  copyLayer(numb) {
    const copyElem = this.layers[numb - 1];
    this.layers.push(copyElem);
  }

  selectNumbLayer(numb) {
    this.selectedLayer = this.layers[numb - 1];
  }

  takeTool(obj) {
    this.toolInfo = obj;
  }

  takeColor(color) {
    this.selectedColor = color;
  }

  takeSize(size) {
    console.log(size);
    this.xSize = size;
    this.ySize = size;

    this.updateCanvasSize();
  }

  updateCanvasSize() {
    console.log('update canvas size and send event from app component');
    this.widthCell = this.canvas.canvas.nativeElement.offsetWidth / this.xSize;
    this.heightCell = this.canvas.canvas.nativeElement.offsetHeight / this.ySize;

    this.layers = [];

    this.updateCanvasSizeEvent.updateCanvasSize.emit();
  }

}

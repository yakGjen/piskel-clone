import {Component, OnInit, ViewChild} from '@angular/core';
import {UpdateCanvasSizeService} from '../shared/update-canvas-size.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private updateCanvasSizeEvent: UpdateCanvasSizeService) {}

  @ViewChild('canvas') canvas;
  layers = [];
  selectedLayer = [];

  widthCell = 0;
  heightCell = 0;

  toolInfo;
  selectedColor;

  xSize = 32;
  ySize = 32;

  ngOnInit() {
    this.widthCell = this.canvas.canvas.nativeElement.offsetWidth / this.xSize;
    this.heightCell = this.canvas.canvas.nativeElement.offsetHeight / this.ySize;

    if (localStorage.length) {
      console.log('from localstorage');
      this.layers = JSON.parse(localStorage.getItem('layers'));
    }
    // localStorage.clear();

    window.onunload = () => {
      localStorage.clear();
      // localStorage.setItem('layers', JSON.stringify(this.layers));
    };
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

import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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
    console.log(this.widthCell);
    setTimeout(() => console.log(this.layers), 0);
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
    this.xSize = size;
    this.ySize = size;
  }
}

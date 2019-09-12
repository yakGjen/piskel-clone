import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UpdateCanvasSizeService} from '../shared/update-canvas-size.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit, OnDestroy {

  constructor(private updateCanvasSizeEvent: UpdateCanvasSizeService) {}

  @ViewChild('previewElem') previewElem;
  @Input() layers;

  @Input() xSize;
  @Input() ySize;

  canvasContext = null;
  gridCoordinats = [];
  timerId = null;

  widthCell = null;
  heightCell = null;

  valueFps = 10;

  ngOnInit() {
    this.updateCanvasSizeEvent.updateCanvasSize.subscribe(() => {
      this.gridCoordinats = [];

      setTimeout(() => {
        this.getGridCoordinats(this.xSize, this.ySize);
        this.animation();
      }, 0);
    });

    this.canvasContext = this.previewElem.nativeElement.getContext('2d');
    this.getGridCoordinats(this.xSize, this.ySize);
    this.animation();
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }

  getGridCoordinats(x, y) {
    this.widthCell = this.previewElem.nativeElement.clientWidth / x;
    this.heightCell = this.previewElem.nativeElement.clientHeight / y;

    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        this.gridCoordinats.push({
          x: j * this.widthCell,
          y: i * this.heightCell,
        });
      }
    }
  }

  changeFps() {
    this.animation(this.valueFps);
  }

  animation(val = this.valueFps) {
    let frame = 0;
    clearInterval(this.timerId);
    const fps = 1000 / val;

    this.timerId = setInterval(() => {
      if (frame >= this.layers.length) {
        frame = 0;
      }
      this.canvasContext.clearRect(0, 0, this.previewElem.nativeElement.width, this.previewElem.nativeElement.height);

      this.layers[frame].forEach((point, i) => {
        this.canvasContext.fillStyle = point.color;
        this.canvasContext.fillRect(this.gridCoordinats[i].x, this.gridCoordinats[i].y, this.widthCell, this.heightCell);
      });
      frame++;
    }, fps);
  }
}

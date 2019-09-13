import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RedrawEventService} from '../shared/redraw-event.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private redraw: RedrawEventService) { }

  @ViewChild('canvas') canvas;

  @Input() layer;

  @Input() xSize;
  @Input() ySize;

  @Input() widthCell;
  @Input() heightCell;

  @Input() toolInfo;
  @Input() selectedColor;

  context;

  allowToDraw = false;

  ngOnInit() {
    this.redraw.redrawEvent.subscribe(() => {
      setTimeout(() => this.redrawCanvas(), 0);
    });

    this.context = this.canvas.nativeElement.getContext('2d');

    this.toolInfo = {
      enabledTool: false,
      tool: '',
    };

    this.selectedColor = 'transparent';
  }

  redrawCanvas() {
    console.log('redraw');
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.layer.forEach((pixelObj) => {
      this.context.fillStyle = pixelObj.color;
      this.context.fillRect(pixelObj.x, pixelObj.y, this.widthCell, this.heightCell);
    });
  }

  changeAllowToDraw(allow) {
    this.allowToDraw = allow;
  }

  draw(event) {
    if (this.allowToDraw) {
      const posX = Math.floor(event.offsetX / this.widthCell);
      const posY = Math.floor(event.offsetY / this.heightCell);

      const numbCell = Math.floor(event.offsetY / this.heightCell) * this.xSize + Math.floor(event.offsetX / this.widthCell + 1);

      if (this.toolInfo.enabledTool === true && this.toolInfo.tool === 'pen') {
        this.drawPen(numbCell, this.selectedColor);
        return;
      }

      if (this.toolInfo.enabledTool === true && this.toolInfo.tool === 'eraser') {
        this.drawEraser(numbCell);
        return;
      }

      if (this.toolInfo.enabledTool === true && this.toolInfo.tool === 'bucket') {
        this.drawBucket(numbCell, this.selectedColor);
        return;
      }
      return;
    }
  }

  drawPen(numbCell, color = 'transparent') {
    this.context.fillStyle = color;
    this.context.fillRect(this.layer[numbCell - 1].x, this.layer[numbCell - 1].y, this.widthCell, this.heightCell);
    this.layer[numbCell - 1].color = color;
  }

  drawEraser(numbCell) {
    this.context.clearRect(this.layer[numbCell - 1].x, this.layer[numbCell - 1].y, this.widthCell, this.heightCell);
    this.layer[numbCell - 1].color = 'transparent';
  }

  drawBucket(numbCell, color = 'transparent') {
    const changeableColor = this.layer[numbCell - 1].color;
    this.context.fillStyle = color;

    if (color === 'transparent') {
      this.layer.forEach((cell) => {
        if (cell.color === changeableColor) {
          this.context.clearRect(cell.x, cell.y, this.widthCell, this.heightCell);
          cell.color = color;
        }
      });
      return;
    }

    this.layer.forEach((cell) => {
      if (cell.color === changeableColor) {
        this.context.fillRect(cell.x, cell.y, this.widthCell, this.heightCell);
        cell.color = color;
      }
    });
  }

}

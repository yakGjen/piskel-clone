import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  @ViewChild('toolsItems') toolsItems;
  @ViewChild('bucket') bucket;
  @ViewChild('pen') pen;
  @ViewChild('eraser') eraser;

  @Output() giveTool: EventEmitter<any> = new EventEmitter();
  @Output() giveColor: EventEmitter<any> = new EventEmitter();
  @Output() giveSize: EventEmitter<any> = new EventEmitter();

  selectedElem;

  constructor() { }

  ngOnInit() {
  }

  getTool(event) {
    const elem = event.target;

    if (this.selectedElem) {
      this.giveTool.emit({
        enabledTool: false,
        tool: this.selectedElem.getAttribute('data-tool'),
      });

      this.selectedElem.classList.remove('select-tool');
      this.selectedElem = '';

      return;
    }

    if (elem.classList.contains('tools-items-bucket') || elem.classList.contains('fa-fill-drip')) {
      this.selectedElem = this.bucket.nativeElement;
      this.bucket.nativeElement.classList.add('select-tool');
    }

    if (elem.classList.contains('tools-items-pen') || elem.classList.contains('fa-pen')) {
      this.selectedElem = this.pen.nativeElement;
      this.pen.nativeElement.classList.add('select-tool');
    }

    if (elem.classList.contains('tools-items-eraser') || elem.classList.contains('fa-eraser')) {
      this.selectedElem = this.eraser.nativeElement;
      this.eraser.nativeElement.classList.add('select-tool');
    }

    this.giveTool.emit({
      enabledTool: true,
      tool: this.selectedElem.getAttribute('data-tool'),
    });
  }

  getColor(color) {
    const selectedColor = color.target[color.target.selectedIndex].value;
    this.giveColor.emit(selectedColor);
  }

  getSize(event) {
    const size = +event.target.dataset.canvasSize;
    this.giveSize.emit(size);
  }

}

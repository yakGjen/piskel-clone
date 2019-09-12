import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RedrawEventService} from '../shared/redraw-event.service';
import {UpdateCanvasSizeService} from '../shared/update-canvas-size.service';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.css']
})
export class LayersComponent implements OnInit {

  storageLayers = [];
  disableButton = false;

  @Input() layers;

  @Output() addLayerEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteLayerEvent: EventEmitter<any> = new EventEmitter();
  @Output() copyLayerEvent: EventEmitter<any> = new EventEmitter();
  @Output() selectNumbLayer: EventEmitter<any> = new EventEmitter();

  @ViewChild('layersWrap') layersWrapObj;
  layersWrapper;

  constructor(
    private redrawCanvas: RedrawEventService,
    private updateCanvasSizeEvent: UpdateCanvasSizeService
  ) { }

  ngOnInit() {
    this.updateCanvasSizeEvent.updateCanvasSize.subscribe(() => this.updateCanvasSize());

    this.layersWrapper = this.layersWrapObj.nativeElement;

    if (this.layers.length === 0) {
      this.addLayer();
      setTimeout(() => this.selectLayer(this.storageLayers[0]), 0);
    } else {
      this.layers.forEach((layer, i) => {
        this.addLayerHere();
      });
      setTimeout(() => this.selectLayer(this.storageLayers[0]), 0);
    }
  }

  addHtmlLayer() {
    const newLayer = document.createElement('div');

    newLayer.dataset.numbLayer = this.storageLayers.length + 1 + '';
    newLayer.classList.add('tools-layers-item');

    newLayer.innerHTML = `
      <div class="layer-info layer-number">${this.storageLayers.length + 1}</div>
      <div class="layer-info layer-delete"><i class="far fa-trash-alt"></i></div>
      <div class="layer-info layer-copy"><i class="far fa-copy"></i></div>
      <div class="layer-info layer-move"><i class="fas fa-expand-arrows-alt"></i></div>
    `;

    return newLayer;
  }

  addLayerHere() {
    this.storageLayers.push(this.addHtmlLayer());
    this.layersWrapper.appendChild(this.storageLayers[this.storageLayers.length - 1]);
  }

  addLayer() {
    if (this.storageLayers.length >= 5) {
      this.disableButton = true;
      return;
    }

    this.storageLayers.push(this.addHtmlLayer());

    this.layersWrapper.appendChild(this.storageLayers[this.storageLayers.length - 1]);

    this.addLayerEvent.emit();
  }

  deleteLayer(elem) {
    const idx = this.storageLayers.indexOf(elem);

    this.storageLayers.splice(idx, 1);
    this.layersWrapper.removeChild(elem);

    if (idx === 0) {
      this.selectLayer(this.storageLayers[0]);
    }

    this.updateNumbLayer();
    this.deleteLayerEvent.emit(idx);
  }

  updateNumbLayer() {
    this.storageLayers.forEach((layer, idx) => {
      layer.dataset.numbLayer = idx + 1 + '';
      layer.querySelector('.layer-number').innerText = idx + 1;
    });
  }

  copyLayer(elem) {
    const res = elem.cloneNode(true);

    this.storageLayers.push(res);
    this.layersWrapper.appendChild(res);

    this.updateNumbLayer();
    this.copyLayerEvent.emit(+elem.dataset.numbLayer);
  }

  initialClick(event) {
    const searchElem = (elem) => {
      if (elem.classList.contains('layers-wrapper')) {
        return;
      } else if (elem.classList.contains('tools-layers-item')) {
        return elem;
      } else {
        return searchElem(elem.parentNode);
      }
    };

    const selectedLayer = searchElem(event.target);

    if (event.target.classList.contains('fa-trash-alt') || event.target.classList.contains('layer-delete')) {
      this.deleteLayer(selectedLayer);
      return;
    }

    if (event.target.classList.contains('fa-copy') || event.target.classList.contains('layer-copy')) {
      this.copyLayer(selectedLayer);
      return;
    }

    this.selectLayer(selectedLayer);
  }

  selectLayer(elem) {
    if (!elem) {
      return;
    }

    this.storageLayers.forEach((layer) => {
      layer.classList.remove('select-tool');

      for (let i = 0; i < layer.children.length; i++) {
        layer.children[i].classList.remove('select-tool-info');
      }
    });

    elem.classList.add('select-tool');

    for (let i = 0; i < elem.children.length; i++) {
      elem.children[i].classList.add('select-tool-info');
    }

    this.selectNumbLayer.emit(+elem.dataset.numbLayer);
    this.redrawCanvas.redrawEvent.emit();
  }

  updateCanvasSize() {
    this.storageLayers.forEach((layer) => {
      this.layersWrapper.removeChild(layer);
    });
    this.storageLayers = [];

    this.addLayer();
    this.selectLayer(this.storageLayers[0]);
  }

}

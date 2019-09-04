import { TestBed } from '@angular/core/testing';

import { UpdateCanvasSizeService } from './update-canvas-size.service';

describe('UpdateCanvasSizeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateCanvasSizeService = TestBed.get(UpdateCanvasSizeService);
    expect(service).toBeTruthy();
  });
});

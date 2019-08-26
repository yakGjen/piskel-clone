import { TestBed } from '@angular/core/testing';

import { RedrawEventService } from './redraw-event.service';

describe('RedrawServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedrawEventService = TestBed.get(RedrawEventService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ConvolutionService } from './convolution.service';

describe('ConvolutionService', () => {
  let service: ConvolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

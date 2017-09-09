import { TestBed, inject } from '@angular/core/testing';

import { KamiService } from './kami.service';

describe('KamiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KamiService]
    });
  });

  it('should be created', inject([KamiService], (service: KamiService) => {
    expect(service).toBeTruthy();
  }));
});

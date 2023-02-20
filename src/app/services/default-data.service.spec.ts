import { TestBed } from '@angular/core/testing';

import { DefaultDataService } from './default-data.service';

describe('DefaultDataService', () => {
  let service: DefaultDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

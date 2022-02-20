import { TestBed } from '@angular/core/testing';

import { NgxJsonConfigService } from './ngx-json-config.service';

describe('NgxJsonConfigService', () => {
  let service: NgxJsonConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxJsonConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

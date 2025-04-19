import { TestBed } from '@angular/core/testing';

import { HttpLoginServiceService } from './http-login-service.service';

describe('HttpLoginServiceService', () => {
  let service: HttpLoginServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpLoginServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

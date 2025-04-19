import { TestBed } from '@angular/core/testing';

import { HttpUserServiceService } from './http-user-service.service';

describe('HttpUserServiceService', () => {
  let service: HttpUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

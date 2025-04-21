import { TestBed } from '@angular/core/testing';

import { HttpDashboardServiceService } from './http-dashboard-service.service';

describe('HttpDashboardServiceService', () => {
  let service: HttpDashboardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDashboardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

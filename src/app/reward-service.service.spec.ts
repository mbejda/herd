import { TestBed } from '@angular/core/testing';

import { RewardServiceService } from './reward-service.service';

describe('RewardServiceService', () => {
  let service: RewardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RewardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

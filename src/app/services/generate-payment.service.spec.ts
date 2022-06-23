import { TestBed } from '@angular/core/testing';

import { GeneratePaymentService } from './generate-payment.service';

describe('GeneratePaymentService', () => {
  let service: GeneratePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

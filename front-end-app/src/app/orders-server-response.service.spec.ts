import { TestBed } from '@angular/core/testing';

import { OrdersServerResponseService } from './orders-server-response.service';

describe('OrdersServerResponseService', () => {
  let service: OrdersServerResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersServerResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

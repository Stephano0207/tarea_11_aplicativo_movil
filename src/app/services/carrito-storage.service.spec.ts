import { TestBed } from '@angular/core/testing';

import { CarritoStorageService } from './carrito-storage.service';

describe('CarritoStorageService', () => {
  let service: CarritoStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

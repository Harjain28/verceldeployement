import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDiscoveryComponent } from './customer-discovery.component';

describe('CustomerDiscoveryComponent', () => {
  let component: CustomerDiscoveryComponent;
  let fixture: ComponentFixture<CustomerDiscoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDiscoveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

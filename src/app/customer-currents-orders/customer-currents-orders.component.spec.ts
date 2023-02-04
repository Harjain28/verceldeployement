import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCurrentsOrdersComponent } from './customer-currents-orders.component';

describe('CustomerCurrentsOrdersComponent', () => {
  let component: CustomerCurrentsOrdersComponent;
  let fixture: ComponentFixture<CustomerCurrentsOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCurrentsOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCurrentsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

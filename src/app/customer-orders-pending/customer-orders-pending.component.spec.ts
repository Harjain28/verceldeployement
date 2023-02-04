import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrdersPendingComponent } from './customer-orders-pending.component';

describe('CustomerOrdersPendingComponent', () => {
  let component: CustomerOrdersPendingComponent;
  let fixture: ComponentFixture<CustomerOrdersPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrdersPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrdersPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

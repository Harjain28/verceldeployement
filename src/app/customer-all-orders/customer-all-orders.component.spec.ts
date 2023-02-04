import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAllOrdersComponent } from './customer-all-orders.component';

describe('CustomerAllOrdersComponent', () => {
  let component: CustomerAllOrdersComponent;
  let fixture: ComponentFixture<CustomerAllOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAllOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAllOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCurrentTrackYourOrdersComponent } from './customer-current-track-your-orders.component';

describe('CustomerCurrentTrackYourOrdersComponent', () => {
  let component: CustomerCurrentTrackYourOrdersComponent;
  let fixture: ComponentFixture<CustomerCurrentTrackYourOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCurrentTrackYourOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCurrentTrackYourOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

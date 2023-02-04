import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentsOrdersComponent } from './currents-orders.component';

describe('CurrentsOrdersComponent', () => {
  let component: CurrentsOrdersComponent;
  let fixture: ComponentFixture<CurrentsOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentsOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerCurrentsOrdersComponent } from './influencer-currents-orders.component';

describe('InfluencerCurrentsOrdersComponent', () => {
  let component: InfluencerCurrentsOrdersComponent;
  let fixture: ComponentFixture<InfluencerCurrentsOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerCurrentsOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerCurrentsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

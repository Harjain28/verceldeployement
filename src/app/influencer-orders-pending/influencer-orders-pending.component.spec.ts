import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerOrdersPendingComponent } from './influencer-orders-pending.component';

describe('InfluencerOrdersPendingComponent', () => {
  let component: InfluencerOrdersPendingComponent;
  let fixture: ComponentFixture<InfluencerOrdersPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerOrdersPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerOrdersPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

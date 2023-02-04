import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerCurrentTrackYourOrdersComponent } from './influencer-current-track-your-orders.component';

describe('InfluencerCurrentTrackYourOrdersComponent', () => {
  let component: InfluencerCurrentTrackYourOrdersComponent;
  let fixture: ComponentFixture<InfluencerCurrentTrackYourOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerCurrentTrackYourOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerCurrentTrackYourOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

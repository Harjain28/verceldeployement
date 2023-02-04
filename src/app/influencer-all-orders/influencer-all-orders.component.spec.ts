import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerAllOrdersComponent } from './influencer-all-orders.component';

describe('InfluencerAllOrdersComponent', () => {
  let component: InfluencerAllOrdersComponent;
  let fixture: ComponentFixture<InfluencerAllOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerAllOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerAllOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

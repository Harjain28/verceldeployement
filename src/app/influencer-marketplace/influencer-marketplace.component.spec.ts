import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerMarketplaceComponent } from './influencer-marketplace.component';

describe('InfluencerMarketplaceComponent', () => {
  let component: InfluencerMarketplaceComponent;
  let fixture: ComponentFixture<InfluencerMarketplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerMarketplaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

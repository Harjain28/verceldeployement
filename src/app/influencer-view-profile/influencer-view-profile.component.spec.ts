import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerViewProfileComponent } from './influencer-view-profile.component';

describe('InfluencerViewProfileComponent', () => {
  let component: InfluencerViewProfileComponent;
  let fixture: ComponentFixture<InfluencerViewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerViewProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

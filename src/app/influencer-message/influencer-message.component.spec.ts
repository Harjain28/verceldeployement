import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerMessageComponent } from './influencer-message.component';

describe('InfluencerMessageComponent', () => {
  let component: InfluencerMessageComponent;
  let fixture: ComponentFixture<InfluencerMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

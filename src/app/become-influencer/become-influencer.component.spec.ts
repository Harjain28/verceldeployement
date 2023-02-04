import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeInfluencerComponent } from './become-influencer.component';

describe('BecomeInfluencerComponent', () => {
  let component: BecomeInfluencerComponent;
  let fixture: ComponentFixture<BecomeInfluencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeInfluencerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

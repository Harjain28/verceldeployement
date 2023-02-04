import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAndHireInfluencerComponent } from './post-and-hire-influencer.component';

describe('PostAndHireInfluencerComponent', () => {
  let component: PostAndHireInfluencerComponent;
  let fixture: ComponentFixture<PostAndHireInfluencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAndHireInfluencerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAndHireInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

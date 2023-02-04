import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessReviewsComponent } from './business-reviews.component';

describe('BusinessReviewsComponent', () => {
  let component: BusinessReviewsComponent;
  let fixture: ComponentFixture<BusinessReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

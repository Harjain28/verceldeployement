import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListingYoutubeComponent } from './create-listing-youtube.component';

describe('CreateListingYoutubeComponent', () => {
  let component: CreateListingYoutubeComponent;
  let fixture: ComponentFixture<CreateListingYoutubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateListingYoutubeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListingYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

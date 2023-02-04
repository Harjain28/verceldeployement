import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListingTiktokComponent } from './create-listing-tiktok.component';

describe('CreateListingTiktokComponent', () => {
  let component: CreateListingTiktokComponent;
  let fixture: ComponentFixture<CreateListingTiktokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateListingTiktokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListingTiktokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListingInstagramComponent } from './create-listing-instagram.component';

describe('CreateListingInstagramComponent', () => {
  let component: CreateListingInstagramComponent;
  let fixture: ComponentFixture<CreateListingInstagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateListingInstagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListingInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

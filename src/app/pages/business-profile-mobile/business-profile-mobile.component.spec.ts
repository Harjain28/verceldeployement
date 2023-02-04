import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProfileMobileComponent } from './business-profile-mobile.component';

describe('BusinessProfileMobileComponent', () => {
  let component: BusinessProfileMobileComponent;
  let fixture: ComponentFixture<BusinessProfileMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessProfileMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessProfileMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

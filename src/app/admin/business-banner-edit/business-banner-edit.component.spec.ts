import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessBannerEditComponent } from './business-banner-edit.component';

describe('BusinessBannerEditComponent', () => {
  let component: BusinessBannerEditComponent;
  let fixture: ComponentFixture<BusinessBannerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessBannerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessBannerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

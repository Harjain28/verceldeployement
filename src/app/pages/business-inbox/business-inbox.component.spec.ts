import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInboxComponent } from './business-inbox.component';

describe('BusinessInboxComponent', () => {
  let component: BusinessInboxComponent;
  let fixture: ComponentFixture<BusinessInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

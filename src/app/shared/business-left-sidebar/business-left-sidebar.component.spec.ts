import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLeftSidebarComponent } from './business-left-sidebar.component';

describe('BusinessLeftSidebarComponent', () => {
  let component: BusinessLeftSidebarComponent;
  let fixture: ComponentFixture<BusinessLeftSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessLeftSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

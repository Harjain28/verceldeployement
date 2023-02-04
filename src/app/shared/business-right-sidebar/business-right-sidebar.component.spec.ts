import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRightSidebarComponent } from './business-right-sidebar.component';

describe('BusinessRightSidebarComponent', () => {
  let component: BusinessRightSidebarComponent;
  let fixture: ComponentFixture<BusinessRightSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessRightSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

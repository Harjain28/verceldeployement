import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbusinessRightSidebarComponent } from './adminbusiness-right-sidebar.component';

describe('AdminbusinessRightSidebarComponent', () => {
  let component: AdminbusinessRightSidebarComponent;
  let fixture: ComponentFixture<AdminbusinessRightSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminbusinessRightSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbusinessRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

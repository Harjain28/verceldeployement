import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminbusinessLeftSidebarComponent } from './adminbusiness-left-sidebar.component';

describe('AdminbusinessLeftSidebarComponent', () => {
  let component: AdminbusinessLeftSidebarComponent;
  let fixture: ComponentFixture<AdminbusinessLeftSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminbusinessLeftSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminbusinessLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

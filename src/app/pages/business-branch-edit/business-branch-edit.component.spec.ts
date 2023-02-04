import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessBranchEditComponent } from './business-branch-edit.component';

describe('BusinessBranchEditComponent', () => {
  let component: BusinessBranchEditComponent;
  let fixture: ComponentFixture<BusinessBranchEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessBranchEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessBranchEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

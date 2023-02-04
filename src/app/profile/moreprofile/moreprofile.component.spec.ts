import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreprofileComponent } from './moreprofile.component';

describe('MoreprofileComponent', () => {
  let component: MoreprofileComponent;
  let fixture: ComponentFixture<MoreprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobFacebookComponent } from './create-job-facebook.component';

describe('CreateJobFacebookComponent', () => {
  let component: CreateJobFacebookComponent;
  let fixture: ComponentFixture<CreateJobFacebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJobFacebookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobTiktokComponent } from './create-job-tiktok.component';

describe('CreateJobTiktokComponent', () => {
  let component: CreateJobTiktokComponent;
  let fixture: ComponentFixture<CreateJobTiktokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJobTiktokComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobTiktokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

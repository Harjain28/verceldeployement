import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobInstagramComponent } from './create-job-instagram.component';

describe('CreateJobInstagramComponent', () => {
  let component: CreateJobInstagramComponent;
  let fixture: ComponentFixture<CreateJobInstagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJobInstagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

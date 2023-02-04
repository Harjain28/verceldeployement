import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobYoutubeComponent } from './create-job-youtube.component';

describe('CreateJobYoutubeComponent', () => {
  let component: CreateJobYoutubeComponent;
  let fixture: ComponentFixture<CreateJobYoutubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJobYoutubeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

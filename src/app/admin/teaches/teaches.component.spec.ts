import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachesComponent } from './teaches.component';

describe('TeachesComponent', () => {
  let component: TeachesComponent;
  let fixture: ComponentFixture<TeachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgrammsComponent } from './add-programms.component';

describe('AddProgrammsComponent', () => {
  let component: AddProgrammsComponent;
  let fixture: ComponentFixture<AddProgrammsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgrammsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgrammsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

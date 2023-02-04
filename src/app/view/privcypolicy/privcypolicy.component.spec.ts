import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivcypolicyComponent } from './privcypolicy.component';

describe('PrivcypolicyComponent', () => {
  let component: PrivcypolicyComponent;
  let fixture: ComponentFixture<PrivcypolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivcypolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivcypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

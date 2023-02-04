import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventemailComponent } from './eventemail.component';

describe('EventemailComponent', () => {
  let component: EventemailComponent;
  let fixture: ComponentFixture<EventemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

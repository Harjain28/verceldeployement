import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactGreetComponent } from './contact-greet.component';

describe('ContactGreetComponent', () => {
  let component: ContactGreetComponent;
  let fixture: ComponentFixture<ContactGreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactGreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactGreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

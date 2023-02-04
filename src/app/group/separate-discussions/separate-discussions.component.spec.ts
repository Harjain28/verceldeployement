import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparateDiscussionsComponent } from './separate-discussions.component';

describe('SeparateDiscussionsComponent', () => {
  let component: SeparateDiscussionsComponent;
  let fixture: ComponentFixture<SeparateDiscussionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeparateDiscussionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparateDiscussionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagemoreComponent } from './homepagemore.component';

describe('HomepagemoreComponent', () => {
  let component: HomepagemoreComponent;
  let fixture: ComponentFixture<HomepagemoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepagemoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagemoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

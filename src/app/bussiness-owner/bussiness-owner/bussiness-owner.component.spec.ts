import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessOwnerComponent } from './bussiness-owner.component';

describe('BussinessOwnerComponent', () => {
  let component: BussinessOwnerComponent;
  let fixture: ComponentFixture<BussinessOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BussinessOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

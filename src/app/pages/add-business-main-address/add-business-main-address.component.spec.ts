import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusinessMainAddressComponent } from './add-business-main-address.component';

describe('AddBusinessMainAddressComponent', () => {
  let component: AddBusinessMainAddressComponent;
  let fixture: ComponentFixture<AddBusinessMainAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBusinessMainAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBusinessMainAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

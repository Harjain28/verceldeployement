import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAnalyzerComponent } from './customer-analyzer.component';

describe('CustomerAnalyzerComponent', () => {
  let component: CustomerAnalyzerComponent;
  let fixture: ComponentFixture<CustomerAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAnalyzerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

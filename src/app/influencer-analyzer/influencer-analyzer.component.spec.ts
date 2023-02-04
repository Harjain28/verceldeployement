import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerAnalyzerComponent } from './influencer-analyzer.component';

describe('InfluencerAnalyzerComponent', () => {
  let component: InfluencerAnalyzerComponent;
  let fixture: ComponentFixture<InfluencerAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerAnalyzerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerTransactionHistoryComponent } from './influencer-transaction-history.component';

describe('InfluencerTransactionHistoryComponent', () => {
  let component: InfluencerTransactionHistoryComponent;
  let fixture: ComponentFixture<InfluencerTransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerTransactionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

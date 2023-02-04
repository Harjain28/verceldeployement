import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceDetailsComponent } from './marketplace-details.component';

describe('MarketplaceDetailsComponent', () => {
  let component: MarketplaceDetailsComponent;
  let fixture: ComponentFixture<MarketplaceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfulencerUserPanelComponent } from './infulencer-user-panel.component';

describe('InfulencerUserPanelComponent', () => {
  let component: InfulencerUserPanelComponent;
  let fixture: ComponentFixture<InfulencerUserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfulencerUserPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfulencerUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

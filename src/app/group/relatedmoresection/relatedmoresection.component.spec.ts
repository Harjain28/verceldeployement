import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedmoresectionComponent } from './relatedmoresection.component';

describe('RelatedmoresectionComponent', () => {
  let component: RelatedmoresectionComponent;
  let fixture: ComponentFixture<RelatedmoresectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedmoresectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedmoresectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

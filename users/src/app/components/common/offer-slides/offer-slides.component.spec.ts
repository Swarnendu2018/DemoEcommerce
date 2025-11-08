import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferSlidesComponent } from './offer-slides.component';

describe('OfferSlidesComponent', () => {
  let component: OfferSlidesComponent;
  let fixture: ComponentFixture<OfferSlidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferSlidesComponent]
    });
    fixture = TestBed.createComponent(OfferSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

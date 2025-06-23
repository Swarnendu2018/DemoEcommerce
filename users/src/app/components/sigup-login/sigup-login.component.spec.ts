import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigupLoginComponent } from './sigup-login.component';

describe('SigupLoginComponent', () => {
  let component: SigupLoginComponent;
  let fixture: ComponentFixture<SigupLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigupLoginComponent]
    });
    fixture = TestBed.createComponent(SigupLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

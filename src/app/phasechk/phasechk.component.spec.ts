import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasechkComponent } from './phasechk.component';

describe('PhasechkComponent', () => {
  let component: PhasechkComponent;
  let fixture: ComponentFixture<PhasechkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasechkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasechkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

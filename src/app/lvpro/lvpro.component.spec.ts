import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LVProComponent } from './lvpro.component';

describe('LVProComponent', () => {
  let component: LVProComponent;
  let fixture: ComponentFixture<LVProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LVProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LVProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

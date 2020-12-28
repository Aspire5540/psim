import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoicComponent } from './roic.component';

describe('RoicComponent', () => {
  let component: RoicComponent;
  let fixture: ComponentFixture<RoicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

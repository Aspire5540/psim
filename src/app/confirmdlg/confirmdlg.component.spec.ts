import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmdlgComponent } from './confirmdlg.component';

describe('ConfirmdlgComponent', () => {
  let component: ConfirmdlgComponent;
  let fixture: ComponentFixture<ConfirmdlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmdlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmdlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

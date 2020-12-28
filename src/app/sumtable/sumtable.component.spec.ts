import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumtableComponent } from './sumtable.component';

describe('SumtableComponent', () => {
  let component: SumtableComponent;
  let fixture: ComponentFixture<SumtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

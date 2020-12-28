import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EzxComponent } from './ezx.component';

describe('EzxComponent', () => {
  let component: EzxComponent;
  let fixture: ComponentFixture<EzxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EzxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EzxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

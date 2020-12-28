import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsimdashboardComponent } from './psimdashboard.component';

describe('PsimdashboardComponent', () => {
  let component: PsimdashboardComponent;
  let fixture: ComponentFixture<PsimdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsimdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsimdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobapproveComponent } from './jobapprove.component';

describe('JobapproveComponent', () => {
  let component: JobapproveComponent;
  let fixture: ComponentFixture<JobapproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobapproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

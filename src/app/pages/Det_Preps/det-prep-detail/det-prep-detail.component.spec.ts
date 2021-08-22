import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetPrepDetailComponent } from './det-prep-detail.component';

describe('DetPrepDetailComponent', () => {
  let component: DetPrepDetailComponent;
  let fixture: ComponentFixture<DetPrepDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetPrepDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetPrepDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

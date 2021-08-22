import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetPrepListComponent } from './det-prep-list.component';

describe('DetPrepListComponent', () => {
  let component: DetPrepListComponent;
  let fixture: ComponentFixture<DetPrepListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetPrepListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetPrepListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

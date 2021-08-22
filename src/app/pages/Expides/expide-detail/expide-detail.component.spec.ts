import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpideDetailComponent } from './expide-detail.component';

describe('ExpideDetailComponent', () => {
  let component: ExpideDetailComponent;
  let fixture: ComponentFixture<ExpideDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpideDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpideDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

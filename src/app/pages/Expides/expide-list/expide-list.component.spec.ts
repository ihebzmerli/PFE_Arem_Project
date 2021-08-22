import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpideListComponent } from './expide-list.component';

describe('ExpideListComponent', () => {
  let component: ExpideListComponent;
  let fixture: ComponentFixture<ExpideListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpideListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

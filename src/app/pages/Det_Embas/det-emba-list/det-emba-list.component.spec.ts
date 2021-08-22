import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetEmbaListComponent } from './det-emba-list.component';

describe('DetEmbaListComponent', () => {
  let component: DetEmbaListComponent;
  let fixture: ComponentFixture<DetEmbaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetEmbaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetEmbaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

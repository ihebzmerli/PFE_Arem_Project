import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetEmbaDetailComponent } from './det-emba-detail.component';

describe('DetEmbaDetailComponent', () => {
  let component: DetEmbaDetailComponent;
  let fixture: ComponentFixture<DetEmbaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetEmbaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetEmbaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetEmbaComponent } from './update-det-emba.component';

describe('UpdateDetEmbaComponent', () => {
  let component: UpdateDetEmbaComponent;
  let fixture: ComponentFixture<UpdateDetEmbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDetEmbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetEmbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

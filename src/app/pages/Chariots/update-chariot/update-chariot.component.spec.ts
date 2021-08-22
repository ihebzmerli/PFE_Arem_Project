import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChariotComponent } from './update-chariot.component';

describe('UpdateChariotComponent', () => {
  let component: UpdateChariotComponent;
  let fixture: ComponentFixture<UpdateChariotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChariotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChariotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

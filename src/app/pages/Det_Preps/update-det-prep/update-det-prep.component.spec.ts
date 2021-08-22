import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDetPrepComponent } from './update-det-prep.component';

describe('UpdateDetPrepComponent', () => {
  let component: UpdateDetPrepComponent;
  let fixture: ComponentFixture<UpdateDetPrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDetPrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDetPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChariotDetailComponent } from './chariot-detail.component';

describe('ChariotDetailComponent', () => {
  let component: ChariotDetailComponent;
  let fixture: ComponentFixture<ChariotDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChariotDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChariotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

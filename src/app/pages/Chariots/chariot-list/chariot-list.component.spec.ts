import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChariotListComponent } from './chariot-list.component';

describe('ChariotListComponent', () => {
  let component: ChariotListComponent;
  let fixture: ComponentFixture<ChariotListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChariotListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChariotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

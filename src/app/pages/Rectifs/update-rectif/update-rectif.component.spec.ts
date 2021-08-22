import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRectifComponent } from './update-rectif.component';

describe('UpdateRectifComponent', () => {
  let component: UpdateRectifComponent;
  let fixture: ComponentFixture<UpdateRectifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRectifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

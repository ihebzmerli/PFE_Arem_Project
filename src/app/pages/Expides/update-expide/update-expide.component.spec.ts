import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExpideComponent } from './update-expide.component';

describe('UpdateExpideComponent', () => {
  let component: UpdateExpideComponent;
  let fixture: ComponentFixture<UpdateExpideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateExpideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExpideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

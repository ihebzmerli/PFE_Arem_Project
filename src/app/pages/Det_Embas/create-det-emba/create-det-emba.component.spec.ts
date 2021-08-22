import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDetEmbaComponent } from './create-det-emba.component';

describe('CreateDetEmbaComponent', () => {
  let component: CreateDetEmbaComponent;
  let fixture: ComponentFixture<CreateDetEmbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDetEmbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDetEmbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

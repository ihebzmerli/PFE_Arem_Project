import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChariotComponent } from './create-chariot.component';

describe('CreateChariotComponent', () => {
  let component: CreateChariotComponent;
  let fixture: ComponentFixture<CreateChariotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChariotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChariotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

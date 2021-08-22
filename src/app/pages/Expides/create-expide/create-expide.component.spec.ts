import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpideComponent } from './create-expide.component';

describe('CreateExpideComponent', () => {
  let component: CreateExpideComponent;
  let fixture: ComponentFixture<CreateExpideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExpideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExpideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

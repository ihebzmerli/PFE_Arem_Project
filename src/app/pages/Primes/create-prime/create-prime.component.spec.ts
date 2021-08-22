import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrimeComponent } from './create-prime.component';

describe('CreatePrimeComponent', () => {
  let component: CreatePrimeComponent;
  let fixture: ComponentFixture<CreatePrimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePrimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrimeComponent } from './update-prime.component';

describe('UpdatePrimeComponent', () => {
  let component: UpdatePrimeComponent;
  let fixture: ComponentFixture<UpdatePrimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePrimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
